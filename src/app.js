import { connect } from 'mongodb'
import { Client } from '@elastic/elasticsearch'
import { c } from 'erte'
import webpush from 'web-push'
import Server from './server'

const {
  ELASTIC: elastic, MONGO_URL: mongo,
  PUBLIC_VAPID: public_vapid, PRIVATE_VAPID: private_vapid,

} = process.env

if (!elastic) throw new Error('Expecting ELASTIC env variable')
if (!mongo) throw new Error('Expecting MONGO_URL env variable')
if (!private_vapid) throw new Error('Expecting PRIVATE_VAPID env variable')
if (!public_vapid) throw new Error('Expecting PUBLIC_VAPID env variable')

const client = new Client({
  node: elastic,
})

webpush.setVapidDetails('https://artd.eco', public_vapid, private_vapid)

;(async () => {
  try {
    const [Mongo] = await Promise.all([
      connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((m) => {
          console.log('Connected to %s', c(mongo.replace(/.+@(.+)/, 'mongodb://$1'), 'yellow'))
          return m
        }),
      client.ping().then(() => {
        console.log('Connected to %s', c(elastic, 'red'))
      }),
    ])
    const { url } = await Server({
      client, port: process.env.PORT,
      client_id: process.env.LINKEDIN_ID,
      client_secret: process.env.LINKEDIN_SECRET,
      github_id: process.env.GITHUB_ID,
      github_secret: process.env.GITHUB_SECRET,
      elastic, Mongo,
      appName: 'api.artd.eco',
      webpush,
    })
    console.log('Started on %s', c(url, 'green'))
  } catch ({ stack }) {
    console.log(stack)
    process.exit(1)
  }
})()
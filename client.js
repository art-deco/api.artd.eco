import { Client } from '@elastic/elasticsearch'
import dot from '@demimonde/dotenv'
import tablature from 'tablature'
dot({ name: '.settings' })

const elastic = process.env.ELASTIC
if (!elastic) throw new Error('Expecting ELASTIC env variable')

const client = new Client({
  node: elastic,
})

;(async () => {
  await client.ping()
  console.log('ping')
  const res = await client.search({
    index: `api.artd.eco-*`,
    sort: [
      'date:desc',
    ],
    body: {
      query: {
        bool: {
          must: [
            { match: { status:  200 } },
            // { match_phrase: { 'headers.referer':  referer } },
            // { match: { 'path':  '/counter.svg' } },
          ],
          must_not: [
            { match: { 'headers.from':  'googlebot' } },
            { match: { 'ip':  '127.0.0.1' } },
            { exists: { field: 'headers.if-none-match' } },
          ],
        },
      },
      size: 5,
      // aggs: {
      //   ids: {
      //     cardinality: {
      //       field: '_id',
      //     },
      //   },
      //   min_date: { min: { field: 'date', format: 'yyyy-MM-dd' } },
      // },
    },
  })
  const { total, hits } = res.body.hits
  console.log('total %s', total.value)
  const data = hits.map(({ _source }) => {
    let country_iso_code
    try {
      country_iso_code = _source.geoip.country_iso_code
    } catch (err) { }
    let ip = _source.ip
    if (country_iso_code) ip = `${ip} ${country_iso_code}`
    const referer = _source.headers.referer
    _source.ip = ip
    _source.referer = referer
    _source.date = new Date(_source.date).toLocaleString()
    return _source
  })
  const d = tablature({
    keys: ['ip', 'path', 'status', 'date', 'referer'],
    data,
  })
  console.log(d)
  // console.log(data[0])
})()
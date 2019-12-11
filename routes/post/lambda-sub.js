import webpush from 'web-push'

/** @type {import('../..').Middleware} */
export default async (ctx) => {
  const { mongo } = ctx
  const { body: { endpoint, auth, p256dh } = {} } = ctx.request
  if (!endpoint) throw new Error('!Unknown subscription endpoint')
  if (!auth) throw new Error('!Unknown subscription auth')
  if (!p256dh) throw new Error('!Unknown subscription p256dh')

  const subscriptions = mongo.collection('LambdaSubscriptions')

  const { statusCode } = await webpush.sendNotification({
    endpoint,
    keys: { auth, p256dh },
  }, JSON.stringify({
    title: 'Hello', body: 'You\'ve successfully subscribed.',
    icon: 'https://avatars3.githubusercontent.com/u/38815725?s=200&v=4',
    url: 'https://test.com',
  }))

  if (statusCode != 201) throw new Error('!Invalid web-push status code')

  const res = await subscriptions.updateMany({ p256dh }, { $set: {
    p256dh,
    auth,
    endpoint,
  } }, { upsert: true })

  ctx.status = 200
  ctx.body = { p256dh }
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../').Auth} Auth
 */

export const middleware = (route) =>
  ['session', 'nicer', 'jsonErrors', route]
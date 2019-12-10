/** @type {import('../../').Middleware} */
export default async (ctx) => {
  const { query: { key, comments }, mongo } = ctx
  if (!key) throw new Error('!Key is required')
  const subscriptions = mongo.collection('Subscriptions')

  if (comments) {
    const res = await subscriptions.updateOne({ p256dh: key }, { $set: {
      comments: false,
    } })
    ctx.body = { comments: false }
    return
  }
  ctx.body = {}
}

export const middleware = ['jsonErrors']
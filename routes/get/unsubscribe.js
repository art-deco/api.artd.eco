/** @type {import('../../').Middleware} */
export default async (ctx) => {
  const { query: { key, comments, lambda }, mongo } = ctx
  if (!key) throw new Error('!Key is required')

  if (comments) {
    const subscriptions = mongo.collection('Subscriptions')
    const res = await subscriptions.updateOne({ p256dh: key }, { $set: {
      comments: false,
    } })
    ctx.body = { comments: false }
    return
  } else if (lambda) {
    const subscriptions = mongo.collection('LambdaSubscriptions')
    const res = await subscriptions.deleteOne({ p256dh: key })
    ctx.body = { comments: false }
    return
  }
  ctx.body = {}
}

export const middleware = ['jsonErrors']
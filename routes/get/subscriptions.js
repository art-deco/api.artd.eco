/** @type {import('../../').Middleware} */
export default async (ctx) => {
  const { query: { key }, mongo } = ctx
  if (!key) throw new Error('!Key is required')
  const subscriptions = mongo.collection('Subscriptions')

  const res = await subscriptions.findOne({
    p256dh: key,
  })
  if (!res) return ctx.body = {}
  ctx.body = { comments: res.comments }
}

export const middleware = ['jsonErrors']
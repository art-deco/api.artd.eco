/**
 * @type {import('../../').Middleware}
 */
export default async function (ctx) {
  const { time, url, scroll, referrer } = ctx.request.body
  await ctx.client.create({
    index: 'telemetry.api.artd.eco',
    body: { time, scroll, date: new Date(), url,
      'user-agent': ctx.request.headers['user-agent'],
      'referer': ctx.request.headers['referer'],
      ip: ctx.request.ip,
      referrer,
    },
  })
  ctx.status = 200
  ctx.body = ''
}

export const middleware = ['nicer']
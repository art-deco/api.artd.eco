import { makeElement } from '@svag/lib'
import Window from '@svag/window'
import { parse } from 'url'
import { createHash } from 'crypto'

const cache = {}

const HOSTS = ['api.artd.eco', 'localhost:5000', 'localhost:3000', 'www.artd.eco']

/**
 * @type {import('../..').Middleware}
 */
const counter = async (ctx) => {
  ctx.type = 'image/svg+xml'

  const client = ctx.client
  const { appName, req } = ctx

  const { referer } = req.headers
  if (!referer) return ctx.body = helloWorld

  const { host: h } = parse(referer)
  if (!HOSTS.includes(h)) return ctx.body = helloWorld

  const e = createHash('md5').update(referer).digest('hex')
  ctx.etag = e

  const item = cache[referer]
  if (!item) {
    const p = client.search({
      index: `${appName}-*`,
      body: {
        query: {
          bool: {
            must: [
              { match: { status:  200 } },
              { match_phrase: { 'headers.referer':  referer } },
              { match: { 'path':  '/counter.svg' } },
            ],
            must_not: [
              { match: { 'headers.from': 'googlebot' } },
              { exists: { field: 'headers.if-none-match' } },
            ],
          },
        },
        size: 0,
        aggs: {
          ids: {
            cardinality: {
              field: '_id',
            },
          },
          min_date: { min: { field: 'date', format: 'yyyy-MM-dd' } },
        },
      },
    })
    const clear = (err) => {
      setTimeout(() => {
        delete cache[referer]
      }, 5 * MIN)
      throw err
    }
    cache[referer] = p.then((res) => {
      // cache for 1 minutes
      clear()
      const { body : { aggregations: {
        ids: { value: count },
        min_date: { value: min_date },
      } } } = res
      const d = new Date(min_date).toDateString()
      return makeWindow(count, d)
    }).catch(clear)
  } else {
    debugger
  }

  const r = await cache[referer]
  ctx.body = r
}

const MIN = 1000 * 60

const makeWindow = (count, d) => {
  const line = makeElement('text', {
    attributes: {
      'font-family': 'Lucida Sans Typewriter,Lucida Console,monaco,Bitstream Vera Sans Mono,monospace',
      'font-size': '12px',
      x: 0,
      y: 10,
    },
    content: `$ ${count} people have`,
  })
  const line2 = makeElement('text', {
    attributes: {
      'font-family': 'Lucida Sans Typewriter,Lucida Console,monaco,Bitstream Vera Sans Mono,monospace',
      'font-size': '12px',
      x: 0,
      y: 26,
    },
    content: 'viewed this article',
  })
  const line3 = makeElement('text', {
    attributes: {
      'font-family': 'Lucida Sans Typewriter,Lucida Console,monaco,Bitstream Vera Sans Mono,monospace',
      'font-size': '12px',
      x: 0,
      y: 42,
    },
    content: `since ${d}`,
  })

  const res = Window({
    title: 'Views',
    width: 165,
    height: 50,
    noStretch: true,
    content: [line, line2, ...(count ? [line3] : [])],
    noShadow: true,
  })
  return res
}

const helloWorld = Window({
  title: 'Counter',
  width: 165,
  height: 50,
  noStretch: true,
  content: [makeElement('text', {
    attributes: {
      'font-family': 'Lucida Sans Typewriter,Lucida Console,monaco,Bitstream Vera Sans Mono,monospace',
      'font-size': '12px',
      x: 0,
      y: 10,
    },
    content: 'Hello World',
  })],
  noShadow: true,
})

export default counter
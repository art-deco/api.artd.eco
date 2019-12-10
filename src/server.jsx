import idio from '@idio/idio'
import { sync } from 'uid-safe'
import render from '@depack/render'
import initRoutes, { watchRoutes } from '@idio/router'
import Router from 'koa-router'
import linkedIn from '@idio/linkedin'
import github from '@idio/github'
import frontend from '@idio/frontend'
import { getUser } from '@idio/linkedin'
import logarithm from 'logarithm'
import { collect } from 'catchment'
import Nicer from 'nicer'
import cleanStack from '@artdeco/clean-stack'
import DefaultLayout from '../layout'

function getBoundary(req) {
  const contentType = req.headers['content-type']
  if (!contentType) {
    throw new Error('Content-type not found')
  }
  let boundary = /; boundary=(.+)/.exec(contentType)
  if (!boundary) {
    throw new Error('boundary not found')
  }

  ([, boundary] = boundary)
  return boundary
}

const {
  NODE_ENV,
  HOST = 'https://api.artd.eco',
  FRONT_END = 'https://www.artd.eco',
  CLOSURE, // for /comments page
  SESSION_KEY,
} = process.env
const PROD = NODE_ENV == 'production'

/**
 * Starts the server.
 */
export default async function Server({
  client, port, client_id, client_secret, appName,
  watch = !PROD, elastic, Mongo, github_id, github_secret,
}) {
  const { app, url, middleware } = await idio({
    cors: {
      use: true,
      origin: PROD && [FRONT_END, HOST, 'http://localhost:5001'],
      config: { credentials: true },
    },
    // logger: { use: !PROD },
    compress: { use: true },
    logarithm: {
      middlewareConstructor() {
        const l = logarithm({
          app: appName,
          url: elastic,
        })
        return l
      },
      use: true,
    },
    nicer: {
      middlewareConstructor() {
        return async (ctx, next) => {
          const boundary = getBoundary(ctx.req)
          const nicer = new Nicer({ boundary })
          ctx.req.pipe(nicer)
          const p = []
          await new Promise((r, j) => {
            nicer
              .on('data', ({ header, stream }) => {
                const collected = collect(stream).then((data) => {
                  const s = header.toString()
                  const n = /Content-Disposition: form-data; name="(.+)"/.exec(s)
                  if (!n) throw new Error('Field name not found')
                  const [,name] = n
                  return { name, data }
                })
                p.push(collected)
              })
              .on('end', r)
              .on('error', j)
          })
          const body = await Promise.all(p)
          ctx.request.body = body.reduce((acc, { name, data }) => {
            acc[name] = data
            return acc
          }, {})
          await next()
        }
      },
    },
    frontend: {
      middlewareConstructor() {
        return frontend()
      },
      use: !PROD,
      // config: {
      //   pragma: null,
      //   override: {
      //     preact: '/node_modules/preact/src/preact.js',
      //   },
      // },
    },
    static: [{ use: PROD, root: 'docs' }, {
      use: !PROD, root: 'static',
    }],
    session: { keys: [SESSION_KEY] },

    async jsonErrors(ctx, next) {
      try {
        await next()
      } catch (err) {
        if (err.message.startsWith('!')) {
          ctx.body = { error: err.message.replace('!', '') }
          console.log(err.message)
        } else {
          ctx.body = { error: 'internal server error' }
          err.stack = cleanStack(err.stack, {
            ignoredModules: ['koa-compose', 'koa-router', 'koa-session'],
          })
          app.emit('error', err)
        }
      }
    },
  }, { port })

  const router = new Router()

  Object.assign(app.context, {
    mongo: Mongo.db(),
    prod: PROD,
    HOST: PROD ? HOST : url,
    CLOSURE: PROD || CLOSURE,
    client, appName,
    render: (vnode, props = {}, Layout = DefaultLayout) => {
      return render(<Layout {...props}>
        {vnode}
      </Layout>, {
        addDoctype: true,
        pretty: true,
      })
    },
  })

  if (CLOSURE)
    console.log('Testing Closure bundle: %s', 'closure/comments.js')
  const li = {
    session: middleware.session,
    client_id,
    client_secret,
    scope: 'r_liteprofile',
  }
  linkedIn(router, {
    ...li,
    error(ctx, error) {
      console.log('Linkedin error %s', error)
      ctx.redirect(`/callback?error=${error}`)
    },
    path: '/linkedin',
    async finish(ctx, token, user) {
      ctx.session.linkedin_token = token
      ctx.session.linkedin_user = getUser(user)
      if (!ctx.session.csrf) ctx.session.csrf = sync(18)
      ctx.redirect('/callback')
    },
  })
  github(app, {
    session: middleware.session,
    client_id: github_id,
    client_secret: github_secret,
    path: '/github',
    error(ctx, error, desc) {
      console.log('Github error %s %s', error, desc)
      ctx.redirect(`/callback?error=${error}`)
    },
    async finish(ctx, token, scope, user) {
      ctx.session.github_token = token
      ctx.session.github_user = {
        login: user.login,
        name: user.name,
        avatar_url: user.avatar_url,
        html_url: user.html_url,
      }

      if (!ctx.session.csrf) ctx.session.csrf = sync(18)
      await ctx.session.manuallyCommit()
      ctx.redirect('/callback')
    },
  })
  const w = await initRoutes(router, 'routes', {
    middleware,
  })
  if (watch) watchRoutes(w)
  app.use(router.routes())
  app.use(ctx => ctx.redirect(FRONT_END))
  return { app, url }
}
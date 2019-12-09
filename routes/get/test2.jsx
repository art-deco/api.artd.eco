/**
 * @type {import('../..').Middleware}
 */
export default async (ctx) => {
  const App = (<div>
    <img src="/counter.svg" />
  </div>)

  ctx.body = ctx.render(App)
}
/**
 * @type {import('../..').Middleware}
 */
export default async (ctx) => {
  const App = (<div>
    <a id="subscribe-btn" href="#" className="btn btn-lg">Subscribe</a>
    <Closure closure={ctx.CLOSURE} />
  </div>)

  ctx.body = ctx.render(App)
}

const Closure = ({ closure }) => {
  if (closure) return (<script src="/subscribe.js"></script>)
  return (<script type="module" src="frontend/subscribe.js"></script>)
}

{/* <script type="module" src="/frontend/test"/> */}
/**
 * @type {import('../..').Middleware}
 */
export default async (ctx) => {
  const App = (<div>
    <script type="module">
      {`import { h } from '/node_modules/preact/src/preact'; window.h = h`}
    </script>
    <script type="module" src="/frontend/test"/>
    <img src="/counter.svg" />
  </div>)

  ctx.body = ctx.render(App)
}
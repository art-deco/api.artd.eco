/**
 * @type {import('../..').Middleware}
 */
export default async (ctx) => {
  const App = (<div>
    <img src="/counter.svg" />

    <script type="module">
      {`import { h } from '/node_modules/preact/src/preact'; window.h = h`}
    </script>

    <script src="/frontend/client.js"/>
  </div>)

  ctx.body = ctx.render(App)
}

{/* <script type="module" src="/frontend/test"/> */}
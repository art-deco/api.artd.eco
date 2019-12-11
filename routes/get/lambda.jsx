import webpush from 'web-push'

/** @type {import('../../').Middleware} */
export default async function lambda(ctx) {
  const { mongo, query: { 'secret-key': secretKey, subject }, render, CLOSURE } = ctx
  if (secretKey) {
    if (secretKey != process.env.LAMBDA_KEY)
      throw new Error('Wrong lambda key')
    // lambda invocation
    console.log('invocation: %s', subject)
    const subs = mongo.collection('LambdaSubscriptions')
    const allSubs = await subs.find().toArray()

    const payload = {
      title: 'New Package',
      body: subject,
      // url: '',
      icon: 'https://avatars3.githubusercontent.com/u/38815725?s=200&v=4',
    }

    const p = allSubs.reduce(async (acc, sub) => {
      await acc
      const { auth, p256dh, endpoint } = sub
      const { statusCode } = await webpush.sendNotification({
        endpoint, keys: { auth, p256dh },
      }, JSON.stringify(payload))
      if (statusCode != 201) {
        throw new Error('Invalid webpush status code.')
      }
    }, {})
    p.catch(err => {
      ctx.onerror(err)
    })

    // send message to all
    ctx.status = 200
    return
  } else {
    ctx.body = render(
      <div>
        <div className="container" id="preact" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/preact/8.5.3/preact.min.js" />
        {CLOSURE && <script>{`window.host='https://api.artd.eco'`}</script>}
        <Closure closure={CLOSURE}/>
      </div>)
  }
}

const Closure = ({ closure }) => {
  if (closure) return (<script src="/lambda.js"></script>)
  return (<script type="module" src="frontend/lambda"></script>)
}
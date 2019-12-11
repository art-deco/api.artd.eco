/* eslint-env browser */
import fetch from 'unfetch'

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

// ;(async() => {
//   if ('serviceWorker' in navigator) {
//     await send()
//   }
// })()

/**
 * @param {PushSubscription} subscription
 */
const getSub = (subscription) => {
  const { endpoint, 'keys': { 'p256dh': p256dh, 'auth': auth } } = JSON.parse(JSON.stringify(subscription))
  return { endpoint, keys: { p256dh, auth } }
}

export const checkSubscribed = async (register, host = '') => {
  const sub = await register.pushManager.getSubscription()
  try {
    const { keys: { p256dh } } = getSub(sub)
    const res = await fetch(`${host}/subscriptions?key=${p256dh}`)
    const { 'comments': comments } = await res.json()
    return { comments, p256dh }
  } catch (err) {
    return false
  }
}

async function send() {
  const register = await navigator.serviceWorker.register('/service-worker.js', {
    scope: '/',
  })
  try {
    const isSubscribed = await checkSubscribed(register)
    if (!isSubscribed) await subscribe(register)
  } catch (err) {
    console.error(err)
    // subscription failed...
  }
}

export const subscribe = async (register, host = '') => {
  const res = await fetch(`${host}/vapid`)
  const vapidPublicKey = await res.text()
  if (!vapidPublicKey) throw new Error('Could not fetch vapid key.')

  const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey)
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedVapidKey,
  })
  const body = new FormData()
  const { endpoint, keys: { p256dh, auth } } = getSub(subscription)
  body.append('endpoint', endpoint)
  body.append('p256dh', p256dh)
  body.append('auth', auth)
  body.append('comments', `true`)
  const f = await fetch(`${host}/subscribe`, {
    method: 'POST',
    body,
  })
  const data = await f.json()
  return { p256dh }
}
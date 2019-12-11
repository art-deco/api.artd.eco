import { subscribe } from './client'

const btn = document.getElementById('subscribe-btn')

if (btn) {
  const initial = btn.innerText
  btn.onclick = async (ev) => {
    ev.preventDefault()
    const register = await navigator.serviceWorker.register('/service-worker.js', {
      scope: '/',
    })
    subscribe(register, window['host'] || '', {
      type: 'updates',
    }).then(({ p256dh }) => {
      if (p256dh) btn.innerText = `${initial} ✅`
    })
    return false
  }
}
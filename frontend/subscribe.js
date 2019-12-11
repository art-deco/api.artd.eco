import { subscribe } from './client'

const btn = document.getElementById('subscribe-btn')

if (btn) {
  const initial = btn.innerText
  btn.onclick = async (ev) => {
    ev.preventDefault()
    reg(initial)
    return false
  }
}

const reg = async (initial) => {
  const register = await navigator.serviceWorker.register('/service-worker.js', {
    scope: '/',
  })
  const { p256dh } = await subscribe(register, window['host'] || '', {
    type: 'updates',
  })
  if (p256dh) btn.innerText = `${initial} ✅`
}
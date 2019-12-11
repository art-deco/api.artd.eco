/* eslint-env serviceworker */

self.addEventListener('push', async ({ data }) => {
  const { title, body, icon, url } = /** @type {PushNotification} */ (data.json())
  await self.registration.showNotification(title, {
    body,
    icon,
    requireInteraction: true,
    data: { url },
  })
})
self.addEventListener('notificationclick', async ({ notification }) => {
  const { data: { url } } = notification
  if (!url) return
  await clients.openWindow(url)
  notification.close()
})

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').PushNotification} PushNotification
 */
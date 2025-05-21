import { setupWorker } from 'msw/browser'
import { handlers } from './handlers.ts'
 
export const worker = setupWorker(...handlers)

if ('serviceWorker' in navigator && import.meta.env.VITE_ENV === 'development') {
  window.addEventListener('beforeunload', () => {
    navigator.serviceWorker.getRegistrations().then((regs) => {
      regs.forEach((reg) => reg.unregister())
    })
  })
}
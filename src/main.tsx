import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import { getUser } from './store/userSlice.ts'

const mocksEnabled = import.meta.env.VITE_MOCKS_ENABLED
const authMocksEnabled = import.meta.env.VITE_AUTH_ADMIN_MOCKS_ENABLED

async function enableMocking() {
  console.log('Enabling mocking', mocksEnabled)
  if (mocksEnabled === 'false') {
    return
  }

  if (mocksEnabled === 'true' && authMocksEnabled === 'true') {
    window.__MOCK_SESSION__ = {
      tokens: {
        accessToken: {
          payload: {
            'cognito:groups': ['admin'], // change this to switch users locally
          },
        },
      },
    };
    window.__store__ = store;
    window.getUser = getUser;
    console.log('Enabling auth mock as admin', authMocksEnabled)
  } else if (mocksEnabled === 'true') {
    window.__MOCK_SESSION__ = {
      tokens: {
        accessToken: {
          payload: {
            'cognito:groups': [], // default to no groups
          },
        },
      },
    };
    window.__store__ = store;
    window.getUser = getUser;
    console.log('No auth mock enabled, default is read only', authMocksEnabled)
  }

  if (import.meta.env.VITE_MOCKS_ENABLED === 'true') {
    const { worker } = await import('./mocks/browser.ts')

    // `worker.start()` returns a Promise that resolves
    // once the Service Worker is up and ready to intercept requests.
    return worker.start({
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    })
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  )
})

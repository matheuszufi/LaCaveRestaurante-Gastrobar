import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { HeroProvider } from './components/HeroContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HeroProvider>
        <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#e7e7e7',
            border: '1px solid #454545',
          },
        }}
      />
      </HeroProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

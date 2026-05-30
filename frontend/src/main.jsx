import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import store from './app/store'
import { AuthProvider } from './context/AuthContext'
import ErrorBoundary from './components/common/ErrorBoundary'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>        
          <AuthProvider>        
            <Toaster
              position="top-right"
              toastOptions={{ duration: 3000 }}
            />
            <App />
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </StrictMode>
)
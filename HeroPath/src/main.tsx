import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { setupStorageLifecycle } from './utils/storageLifecycle'

/**
 * Application Entry Point
 * 
 * This is the main entry point for the React application.
 * It renders the root App component into the DOM element with id="root".
 * 
 * React.StrictMode enables additional development checks and warnings.
 */

// Setup storage lifecycle management (debounced saves, error handling, etc.)
setupStorageLifecycle()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

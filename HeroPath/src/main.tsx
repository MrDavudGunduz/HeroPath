import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

/**
 * Application Entry Point
 * 
 * This is the main entry point for the React application.
 * It renders the root App component into the DOM element with id="root".
 * 
 * React.StrictMode enables additional development checks and warnings.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

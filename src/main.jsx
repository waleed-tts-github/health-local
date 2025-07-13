import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConsultationFlowProvider } from './contexts/ConsulationFlowContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConsultationFlowProvider>
    <App />
    </ConsultationFlowProvider>
  </StrictMode>,
)

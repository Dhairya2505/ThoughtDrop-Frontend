import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import SigninPage from './components/signin.tsx'

createRoot(document.getElementById('root')!).render(
    // <App />
    <SigninPage />
)

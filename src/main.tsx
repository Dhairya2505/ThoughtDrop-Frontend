import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.tsx'
import SigninPage from './components/signin.tsx'
import SignupPage from './components/signup.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes> 
            <Route path='/' element={<App />} />
            <Route path='/signin' element={<SigninPage />} />
            <Route path='/signup' element={<SignupPage />}/>
        </Routes>
    </BrowserRouter>
)

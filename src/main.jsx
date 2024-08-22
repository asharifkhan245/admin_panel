import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from '../src/context/UserContext';

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <App />
  </UserProvider>

)

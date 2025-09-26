import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/UserContext.jsx'
import CaptainContext from './context/CapatainContext.jsx'
import SocketContext from './context/SocketContext.jsx'
import './utils/axiosConfig.js';

createRoot(document.getElementById('root')).render(

  <CaptainContext>
    <UserContext>
      <SocketContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketContext>
    </UserContext>
  </CaptainContext>

)
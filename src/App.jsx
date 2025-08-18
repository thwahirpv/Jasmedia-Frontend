import React, { useEffect } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {


  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);
  
  return (
    <AppRoutes />
  )
}

export default App

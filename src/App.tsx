import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Navbar from '@/components/shared/navbar'
import Auth from '@/components/auth'
import Dashboard from './pages/dashboard' 
import { Toaster } from './components/ui/sonner'
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      <Toaster position="top-right" />
    </>
  )
}

export default App

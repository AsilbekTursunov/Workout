import { auth } from '@/firebase'
import { useUserStore } from '@/store/user.store'
import { ReactNode, useEffect, useState } from 'react'
import Loader from '../shared/loader' 

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { setUser } = useUserStore() 
  useEffect(() => {
    setIsLoading(true)
  
    auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user) 
      }
      setIsLoading(false)
    })
  }, [])

  return isLoading ? <Loader /> : <>{children}</>
}

export default AuthProvider

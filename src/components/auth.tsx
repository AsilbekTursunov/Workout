import { useAuthState } from '@/store/auth.store'
import { Card } from './ui/card'
import Register from './auth/register'
import Login from './auth/login' 

const Auth = () => {
  const { authState } = useAuthState()
  return (
    <div className='w-full h-screen bg-gradient-to-t from-background to-muted-foreground flex items-center justify-center pt-24'>
      <Card className='p-6 w-11/12  md:w-3/5 lg:w-2/5 xl:w-1/3 bg-background relative'>
        {authState === 'login' ? <Login /> : <Register />}
        {/* <Socials /> */}
      </Card>
    </div>
  )
}

export default Auth

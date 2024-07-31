import { useAuthState } from '@/store/auth.store'
import { Separator } from '../ui/separator'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { loginSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { GoAlert } from 'react-icons/go'
import { auth } from '@/firebase'
import { useState } from 'react'
import Loader from '../shared/loader'
import { useUserStore } from '@/store/user.store'

const Login = () => {
  const { setUser } = useUserStore()
  const { setAuth } = useAuthState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('') 
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (value: z.infer<typeof loginSchema>) => {
    const { email, password } = value
    setIsLoading(true)
    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      setUser(response.user)
      navigate('/')
    } catch (error) {
      const err = error as Error
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }
  if (error.length > 0) {
    setTimeout(() => {
      setError('')
    }, 2000)
  }
  return (
    <div className='flex flex-col gap-1'>
      {isLoading && <Loader />}
      <h1 className='text-foreground text-xl font-bold'>Login</h1>
      <p className='text-muted-foreground text-sm md:text-lg'>
        Don't you have an account{' '}
        <span
          className='text-blue-500 hover:underline cursor-pointer'
          onClick={() => setAuth('register')}
        >
          Sign up
        </span>
      </p>
      <Separator className='mt-3' />
      {error && (
        <Alert variant='destructive'>
          <GoAlert className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xl'>Email</FormLabel>
                <FormControl>
                  <Input placeholder='example@gmail.com' {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xl'>Password</FormLabel>
                <FormControl className=' relative'>
                  <Input placeholder='********' {...field} type={'password'} disabled={isLoading} />
                  {/* <GoEye  className=' absolute'  /> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='mt-5 w-full' disabled={isLoading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Login

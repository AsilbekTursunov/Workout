import { useAuthState } from '@/store/auth.store'
import { Separator } from '../ui/separator'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { registerSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { GoAlert } from 'react-icons/go'
import Loader from '../shared/loader'
import { useUserStore } from '@/store/user.store'
const Register = () => {
  const { setAuth } = useAuthState()
  const { setUser } = useUserStore()
  const [isloading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (value: z.infer<typeof registerSchema>) => {
    const { email, password } = value
    setIsLoading(true)
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      setUser(response?.user)
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
      {' '}
      {isloading && <Loader />}
      <h1 className='text-foreground text-xl font-bold'>Register</h1>
      <p className='text-muted-foreground text-sm md:text-lg'>
        Already have an account{' '}
        <span
          className='text-blue-500 hover:underline cursor-pointer'
          onClick={() => setAuth('login')}
        >
          Sign in
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
                <FormLabel className='text-lg'>Email</FormLabel>
                <FormControl>
                  <Input placeholder='example@gmail.com' disabled={isloading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex gap-4 flex-col lg:flex-row'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel className='text-lg'>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='********' {...field} disabled={isloading} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel className='text-lg'>Confirm password</FormLabel>
                  <FormControl>
                    <Input placeholder='********' {...field} disabled={isloading} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type='submit' className='mt-5 w-full' disabled={isloading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Register

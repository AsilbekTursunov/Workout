import { FaGoogle } from 'react-icons/fa'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/firebase'
import { useState } from 'react'
import Loader from '../shared/loader'
import { useNavigate } from 'react-router-dom'

const Socials = () => {
  const [isloading, setIsloading] = useState(false)
  const navigate = useNavigate()
  const onGoogle = async () => {
    setIsloading(true)
    try {
      const googleProvider = new GoogleAuthProvider()
      signInWithPopup(auth, googleProvider)
        .then(() => {
          navigate('/')
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          setIsloading(false)
        })
    } catch (error) {
      const err = error as Error
      console.error(err)
    }
  }
  // const onGithub = async () => {
  //   setIsloading(true)
  //   try {
  //     const githubProvider = new GithubAuthProvider()
  //     signInWithPopup(auth, githubProvider)
  //       .then(() => {
  //         navigate('/')
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  //       .finally(() => {
  //         setIsloading(false)
  //       })
  //   } catch (error) {
  //     const err = error as Error
  //     console.error(err)
  //   }
  // }
  return (
    <>
      {isloading && <Loader />}
      <Separator className='my-3' />
      <div className='flex flex-col xl:flex-row gap-4'>
        {/* <Button className='space-x-2 w-full' variant={'secondary'} onClick={onGithub}>
          <FaGithub />
          <span>Sign up with Github</span>
        </Button> */}
        <Button className='space-x-2 w-full' variant={'destructive'} onClick={onGoogle}>
          <FaGoogle />
          <span>Sign up with Google</span>
        </Button>
      </div>
    </>
  )
}

export default Socials

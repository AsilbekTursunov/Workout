import { Button } from '@/components/ui/button'
import men from '@/assets/men.png'
import { feturesItems, prograss } from '@/constants'
import { Card } from '@/components/ui/card'
import { FaArrowRightLong } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store/user.store'
import { CgGym } from 'react-icons/cg'
import { IoMdLogOut } from 'react-icons/io'
import { auth } from '@/firebase'
const Home = () => {
  const { user, setUser } = useUserStore()
  const navigate = useNavigate()

  const onLogOut = () => {
    auth.signOut().then(() => {
      setUser(null)
      navigate('/auth') // Redirect to login page after logout
    })
    // TODO: Implement actual logout logic
  }

  return (
    <div className='flex flex-col max-md:mx-4 md:container   md:mx-auto bg-background pt-20'>
      <div className='    flex flex-col lg:flex-row items-center justify-between '>
        <div className='lg:w-1/2 max-lg:w-full  flex h-full flex-col justify-center'>
          <h1 className='my-6 text-balance text-6xl sm:text-7xl md:text-9xl font-semibold text-secondary-foreground'>
            Workout With Me
          </h1>
          <p className='text-muted-foreground'>
            A huge selection of health and fitness content, healthy <br /> recipes and
            transformation stories to help you get fit and stay fit
          </p>
          {user ? (
            <>
              <div className='flex gap-4 mt-10'>
                <Link to={'/dashboard'}>
                  <Button className=' dark:text-white'>
                    {' '}
                    <CgGym className='size-5 mr-2' />
                    Fitness time
                  </Button>
                </Link>
                <Button
                  onClick={onLogOut}
                  className='bg-destructive/80 hover:bg-destructive dark:text-white'
                >
                  {' '}
                  <IoMdLogOut className='size-5 mr-2' />
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link to={'/auth'}>
                <Button className='w-fit mt-6 font-bold h-12 text-lg'>Start workout today!</Button>
              </Link>
            </>
          )}

          <div className='mt-24'>
            <p className='text-muted-foreground font-semibold text-xl'>AS FEATURED IN</p>
            <div className='flex items-center gap-4 mt-2'>
              {feturesItems.map((Item, index) => (
                <Item key={index} className='size-12' />
              ))}
            </div>
          </div>
        </div>
        <div className='lg:w-1/2 max-lg:w-full flex justify-center lg:justify-end'>
          <img src={men} alt='men-gym' className=' max-md:w-56 self-center max-lg:mt-10' />
        </div>
      </div>
      <div className='mt-24'>
        <h1 className='text-4xl'>Not sure where to start?</h1>
        <p className='mt-2 text-muted-foreground'>
          Programms offer day-to-day gouidance on an interative calendar to keep
        </p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-8'>
          {prograss.map((item, index) => (
            <Card
              key={index}
              className='p-6 relative group  cursor-pointer justify-between flex gap-4'
            >
              <div className='mr-4'>
                <h1 className='text-xl'>{item.title}</h1>
                <p className='mt-2 text-muted-foreground'>{item.desc}</p>
              </div>
              <div className='relative flex items-center '>
                <FaArrowRightLong className=' right-5 group-hover:translate-x-1 transition-all duration-100 bottom-6' />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home

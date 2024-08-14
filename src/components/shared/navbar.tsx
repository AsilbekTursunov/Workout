import { navLinks } from '@/constants'
import { Button } from '../ui/button'
import { ModeToggle } from '../mode-toggle'
import { Link } from 'react-router-dom'
import { useUserStore } from '@/store/user.store'
import UserBox from './user-box'

const Navbar = () => {
  const { user } = useUserStore()

  return (
    <div className='w-full h-[70px] border-b dark:border-slate-600 fixed inset-0 z-10 bg-background'>
      <div className='md:container max-md:mx-4   md:mx-auto h-full flex justify-between items-center'>
        <Link to={'/'}>
          <h1 className='text-3xl font-bold text-secondary-foreground uppercase'>workout</h1>
        </Link>
        <div className='flex dark:text-white items-center gap-4'>
          {navLinks.map((item, index) => (
            <a
              href={item.path == 'home' ? '/' : user ? '/dashboard' : '/auth'}
              key={index}
              className='text-slate-800 font-normal dark:text-white hover:underline max-md:hidden'
            >
              {item.title}
            </a>
          ))}
          <span className='z-40'>
            <ModeToggle />
          </span>
          {user ? (
            <>
              <UserBox />
            </>
          ) : (
            <>
              <Link to={'/auth'} className='max-md:hidden'>
                <Button variant={'secondary'}>Join Free</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar

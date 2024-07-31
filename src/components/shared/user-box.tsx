import { useUserStore } from '@/store/user.store'
import { Avatar, AvatarImage } from '../ui/avatar'
import { CgGym } from 'react-icons/cg'
import { IoMdLogOut } from 'react-icons/io'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { auth } from '@/firebase'
import { Link, useNavigate } from 'react-router-dom'

const UserBox = () => {
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
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className=' cursor-pointer'>
          {user?.photoURL ? (
            <Avatar className=' cursor-pointer'>
              <AvatarImage src={user?.photoURL!} sizes='20' />
            </Avatar>
          ) : (
            <Avatar className=' cursor-pointer'>
              <div className='flex items-center justify-center p-3 rounded-full size-10 text-2xl uppercase bg-muted text-white'>
                {user?.email![0]}
              </div>
            </Avatar>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56 cursor-pointer'>
          <DropdownMenuLabel className='flex gap-4 items-center'>
            {user?.photoURL ? (
              <>
                <Avatar className=' cursor-pointer'>
                  <AvatarImage src={user?.photoURL!} sizes='20' />
                </Avatar>
              </>
            ) : (
              <>
                <div className='flex items-center justify-center p-3 rounded-full size-10 text-2xl uppercase bg-muted text-white'>
                  {user?.email![0]}
                </div>
              </>
            )}

            <p className='flex flex-col'>
              <span className='text-sm'>{user?.displayName ?? user?.email}</span>
              <span className='text-muted-foreground text-[10px]'>{user?.email}</span>
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='hover:bg-muted cursor-pointer '>
            <Link to={'/dashboard'} className='flex'>
              <CgGym className='size-5 mr-2' />
              Fitness time
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className=' bg-destructive hover:bg-destructive/80 cursor-pointer'
            onClick={onLogOut}
          >
            <IoMdLogOut className='size-5 mr-2' />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UserBox

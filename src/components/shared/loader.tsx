import { Skeleton } from '../ui/skeleton'
import { BiLoaderCircle } from 'react-icons/bi'
const Loader = () => {
  return (
    <Skeleton className=' absolute inset-0 bg-muted w-full h-full  opacity-50 flex items-center justify-center'>
      <BiLoaderCircle className='animate-spin  size-6' />
    </Skeleton>
  )
}

export default Loader

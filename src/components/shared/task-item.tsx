import { Edit2, Trash } from 'lucide-react'
import { CiPause1, CiPlay1 } from 'react-icons/ci'
import { HiStatusOnline } from 'react-icons/hi'
import { MdOutlineTaskAlt } from 'react-icons/md'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { ITask, ITaskData } from '@/types'
import { IoIosRefresh } from 'react-icons/io'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { toast } from 'sonner'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import Loader from './loader'
import moment from 'moment'

interface Props {
  task: ITask
  setIsEditing: () => void
  onDelete: () => void
  refetch: () => void
  data: ITaskData
}

const TaskItem = ({ task, setIsEditing, onDelete, refetch }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const onStart = async () => {
    setIsLoading(true)

    try {
      const ref = doc(db, 'tasks', task.id)

      await updateDoc(ref, {
        status: 'in_progress',
        startTime: Date.now(),
      }).then(() => refetch())
    } catch (error) {
      toast.error(error as string)
    } finally {
      setIsLoading(false)
    }
  }

  const onPause = async () => {
    setIsLoading(true)
    const ref = doc(db, 'tasks', task.id)
    try {
      const elipsed = Date.now() - +task.startTime
      const newTotalTime = (+task.totalTime || 0) + elipsed
      await updateDoc(ref, {
        status: 'paused',
        endTime: Date.now(),
        totaltime: newTotalTime,
      }).then(() => refetch())
    } catch (error) {
      toast.error(error as string)
    } finally {
      setIsLoading(false)
    }
  }

  const renderBtns = () => {
    switch (task.status) {
      case 'unstarted':
        return (
          <Button
            type='button'
            variant={'ghost'}
            size={'icon'}
            className='w-8 h-8'
            onClick={onStart}
          >
            <CiPlay1 className='w-5 h-5 text-indigo-500' />
          </Button>
        )
      case 'in_progress':
        return (
          <Button
            type='button'
            variant={'ghost'}
            size={'icon'}
            className='w-8 h-8'
            onClick={onPause}
          >
            <CiPause1 className='w-5 h-5 text-indigo-500' />
          </Button>
        )
      case 'paused':
        return (
          <Button
            type='button'
            variant={'ghost'}
            size={'icon'}
            className='w-8 h-8'
            onClick={onStart}
          >
            <IoIosRefresh className='w-5 h-5 text-indigo-500' />
          </Button>
        )
    }
  }

  return (
    <Card className='w-full p-4 shadow-md  flex flex-col relative'>
      {isLoading && <Loader />}
      <div className='flex flex-col md:flex-row items-center'>
        <div className='flex gap-1 items-center col-span-2 self-start md:flex-1'>
          <MdOutlineTaskAlt className='text-blue-500' />
          <span className='capitalize'>{task.title}</span>
        </div>
        <div className='flex justify-between max-md:w-full md:justify-end'>
          <div className='flex gap-1 items-center md:mr-56'>
            <HiStatusOnline
              className={cn(
                task.status == 'unstarted' && 'text-blue-500',
                task.status == 'in_progress' && 'text-green-500',
                task.status == 'paused' && 'text-red-500'
              )}
            />
            <span className='capitalize text-sm'>{task.status}</span>
          </div>
          <div className='flex gap-1 items-center justify-self-end'>
            {renderBtns()}
            <Button
              type='button'
              variant={'secondary'}
              size={'icon'}
              className='w-8 h-8'
              onClick={setIsEditing}
            >
              <Edit2 className='w-5 h-5' />
            </Button>
            <Button
              type='button'
              variant={'destructive'}
              size={'icon'}
              className='w-8 h-8'
              onClick={onDelete}
            >
              <Trash className='w-5 h-5' />
            </Button>
          </div>
        </div>
      </div>
      <ul className='flex md:justify-between flex-col md:flex-row   items-center w-full'>
        <li className='self-start'>
          <span className='text-sm px-1 text-muted-foreground'>Started time</span>
          <span className='text-sm px-1 text-muted-foreground'>
            {moment(task.startTime).format('hh:mm:ss a')}
          </span>
        </li>
        {task.status == 'paused' && (
          <>
            <li className='self-start'>
              <span className='text-sm px-1 text-muted-foreground'>End time</span>
              <span className='text-sm px-1 text-muted-foreground'>
                {moment(task.endTime).format('hh:mm:ss a')}
              </span>
            </li>
            <li className='self-start'>
              <span className='text-sm px-1 text-muted-foreground'>Total time</span>
              <span className='text-sm px-1 text-muted-foreground'>
                {moment(+task.endTime - +task.startTime).format('mm:ss')}
              </span>
            </li>
          </>
        )}
      </ul>
    </Card>
  )
}

export default TaskItem

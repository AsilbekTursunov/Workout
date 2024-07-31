import TaskForm from '@/components/forms/task-form'
import Loader from '@/components/shared/loader'
import TaskItem from '@/components/shared/task-item'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { db } from '@/firebase'
import { taskScheme } from '@/lib/validation'
import { TaskService } from '@/service/task.service'
import { useUserStore } from '@/store/user.store'
import { ITask } from '@/types'
import { DialogTitle } from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { BadgePlus } from 'lucide-react'
import { useState } from 'react'
import { GoAlert } from 'react-icons/go'
import { toast } from 'sonner'
import { z } from 'zod'

const Dashboard = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentTask, setCurrentTask] = useState<ITask | null>(null)
  const [open, setOpen] = useState(false)
  const { user } = useUserStore()

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['tasks-data'],
    queryFn: TaskService.getTasks,
  })

  const onAdd = async ({ title }: z.infer<typeof taskScheme>) => {
    if (!user) return null
    return addDoc(collection(db, 'tasks'), {
      title,
      status: 'unstarted',
      startTime: null,
      endTime: null,
      userId: user?.uid,
    })
      .then(() => refetch())
      .finally(() => setOpen(false))
  }

  const onEdit = (task: ITask) => {
    setIsEditing(true)
    setCurrentTask(task)
  }

  const onUpdate = async ({ title }: z.infer<typeof taskScheme>) => {
    if (!user) return null
    if (!currentTask) return null

    const promise = updateDoc(doc(db, 'tasks', currentTask.id), {
      title,
    })
      .then(() => refetch())
      .catch(() => console.log(error))
      .finally(() => setIsEditing(false))

    toast.promise(promise, {
      loading: 'Loading...',
      success: 'Task updated successfully!',
      error: 'Failed to update task.',
    })
    return promise
  }

  const onDelete = async (id: string) => {
    setIsDeleting(true)
    const promise = deleteDoc(doc(db, 'tasks', id))
      .then(() => refetch())
      .finally(() => setIsDeleting(false))

    toast.promise(promise, {
      loading: 'Loading...',
      success: 'Task deleted successfully!',
      error: 'Failed to update task.',
    })
    return promise
  }
  console.log(data)

  return (
    <>
      <div className='h-screen container mx-auto flex items-center mt-20'>
        <div className='grid grid-cols-1  w-full gap-8 items-center'>
          <div className='flex flex-col space-y-3 w-3/4 mx-auto'>
            <div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-t from-background to-secondary'>
              <div className='text-2xl font-bold'>Trainings</div>
              <Button size={'icon'} onClick={() => setOpen(true)}>
                <BadgePlus />
              </Button>
            </div>
            <Separator />
            <div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-b from-background to-secondary relative min-h-60'>
              {isPending || (isDeleting && <Loader />)}
              {error && (
                <Alert variant='destructive'>
                  <GoAlert className='h-4 w-4' />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error?.message}</AlertDescription>
                </Alert>
              )}
              {!isEditing && data && (
                <div className='flex flex-col space-y-3 w-full'>
                  {data.tasks.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      setIsEditing={() => onEdit(task)}
                      onDelete={() => onDelete(task.id)}
                      refetch={refetch}
                      data={data}
                    />
                  ))}
                </div>
              )}
              {isEditing && (
                <div className='flex flex-col space-y-3 w-full'>
                  <TaskForm
                    handler={onUpdate}
                    isEdit={isEditing}
                    onClose={() => setIsEditing(false)}
                    title={currentTask?.title}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-2xl font-medium'>Create a new task</DialogTitle>
            <Separator className='' />
            <TaskForm handler={onAdd} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Dashboard

import { taskScheme } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useState } from 'react'
import { toast } from 'sonner'

interface IAddDocProps {
  title?: string
  isEdit?: boolean
  onClose?: () => void
  handler: (values: z.infer<typeof taskScheme>) => Promise<void | null | object>
}

const TaskForm = ({ title = '', handler, isEdit, onClose }: IAddDocProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof taskScheme>>({
    resolver: zodResolver(taskScheme),
    defaultValues: { title },
  })

  const onSubmit = async (values: z.infer<typeof taskScheme>) => {
    setIsLoading(true)
    const promise =  handler(values).finally(() => {
      setIsLoading(false)
    })

    toast.promise(promise, {
      loading: 'Loading...',
      success: 'Task added successfully!',
      error: 'Failed to add task.',
    })
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 '>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormControl className='mt-4'>
                  <Input placeholder='Create a task' {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex w-full justify-end'>
            {isEdit && (
              <Button type='button' variant={'destructive'} className='mr-2' onClick={onClose}>
                Cancel
              </Button>
            )}
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default TaskForm

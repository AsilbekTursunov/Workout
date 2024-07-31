export interface ITaskData {
  weekTotal: number
  monthTotal: number
  total: number
  tasks: ITask[]
}

export interface ITask {
  id: string
  title: string
  startTime: string
  totalTime: string
  endTime: string
  userId: string
  status: ITaskStatus
}

export type ITaskStatus = 'unstarted' | 'in_progress' | 'paused'

import { auth, db } from '@/firebase'
import { ITask, ITaskData } from '@/types'
import { collection, getDocs, query, where } from 'firebase/firestore'
export const TaskService = {
  getTasks: async () => {
    let weekTotal = 0
    let monthTotal = 0
    let total = 0
    const q = query(collection(db, 'tasks'), where('userId', '==', auth.currentUser?.uid))
    const querySnapshoot = await getDocs(q)

    const tasks = querySnapshoot?.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as ITask[]

    const taskData: ITaskData = {
      weekTotal,
      monthTotal,
      total,
      tasks,
    }

    return taskData
  },
}

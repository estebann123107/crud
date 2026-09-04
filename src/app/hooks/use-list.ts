import { useState } from 'react'
import { Task, TaskList } from '@/app/types'

export const useList = () => {
    const [tasks, setTasks] = useState<TaskList>([])

    const handleAddTask = (task: Task) => {
        setTasks((prevTasks) => [...prevTasks, task])
    }

    const handleDeleteTask = (taskId: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
    }

    const findTaskById = (taskId: string): Task | undefined => {
        return tasks.find((task) => task.id === taskId)
    }

    return {
        tasks,
        handleAddTask,
        handleDeleteTask,
        findTaskById,
    }
}

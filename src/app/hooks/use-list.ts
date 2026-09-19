import { FormEvent, useRef, useState } from 'react'
import { Task } from '@/app/types'
import { useStorage } from './use-storage'

export const TASK_STORAGE_KEY = 'todo-list'

export const useList = () => {
    const [tasks, setTasks] = useStorage(TASK_STORAGE_KEY)
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const handleAddTask = (task: Task) => {
        setTasks((prevTasks) => [...prevTasks, task])
    }

    const handleDeleteTask = (taskId: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
    }

    const handleUpdateTask = (taskId: string, changes: Partial<Task>) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, ...changes } : task
            )
        )
    }

    const findTaskById = (taskId: string): Task | undefined => {
        return tasks.find((task) => task.id === taskId)
    }

    const title = newTaskTitle.trim()

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!title) return

        handleAddTask({
            id: crypto.randomUUID(),
            title,
            completed: false,
        })
        setNewTaskTitle('')
        inputRef.current?.focus()
    }

    return {
        tasks,
        handleAddTask,
        handleDeleteTask,
        handleUpdateTask,
        findTaskById,
        newTaskTitle,
        updateNewTaskTitle: setNewTaskTitle,
        inputRef,
        title,
        handleSubmit,
    }
}

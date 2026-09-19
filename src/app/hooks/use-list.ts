import { FormEvent, useRef, useState } from 'react'
import { Task } from '@/app/types'
import { useStorage } from './use-storage'
import { usePaperBin } from './use-paper-bin'

export const TASK_STORAGE_KEY = 'todo-list'

export const useList = () => {
    const [tasks, setTasks] = useStorage(TASK_STORAGE_KEY)
    const { handleAddTask: handleMoveToPaperBin } = usePaperBin()
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const handleAddTask = (task: Task) => {
        setTasks((prevTasks) =>
            prevTasks.some((prevTask) => prevTask.id === task.id)
                ? prevTasks
                : [...prevTasks, task]
        )
    }

    const handleDeleteTask = (taskId: string) => {
        const deletedTask = tasks.find((task) => task.id === taskId)

        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))

        if (deletedTask) handleMoveToPaperBin(deletedTask)
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

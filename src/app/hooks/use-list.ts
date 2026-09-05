import { FormEvent, useRef, useState } from 'react'
import { Task, TaskList } from '@/app/types'
import { useStorage } from './use-storage'

export const useList = () => {
    const [tasks, setTasks] = useStorage('todo-list', []) as [TaskList, React.Dispatch<React.SetStateAction<TaskList>>]
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const handleAddTask = (task: Task) => {
        setTasks((prevTasks) => [...prevTasks, task])
    }

    const handleDeleteTask = (taskId: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
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
        findTaskById,
        newTaskTitle,
        updateNewTaskTitle: setNewTaskTitle,
        inputRef,
        title,
        handleSubmit,
    }
}

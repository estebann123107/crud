import { useState } from 'react';
import { Task } from '@/app/types';

export const useTask = (task: Task) => {
    const [currentTask, setCurrentTask] = useState<Task>(task);

    const toggleTaskCompletion = () => {
        setCurrentTask((prevTask) => ({
            ...prevTask,
            completed: !prevTask.completed,
        }));
    };

    const updateTaskTitle = (newTitle: string) => {
        setCurrentTask((prevTask) => ({
            ...prevTask,
            title: newTitle,
        }));
    }

    return {
        currentTask,
        toggleTaskCompletion,
        updateTaskTitle,
    };
}

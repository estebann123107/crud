import {
    KeyboardEvent,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { Task } from '@/app/types';

const EXIT_DURATION = 180;

export const useTask = (task: Task, onDelete: () => void) => {
    const [currentTask, setCurrentTask] = useState<Task>(task);
    const [isRemoving, setIsRemoving] = useState(false);
    const textRef = useRef<HTMLTextAreaElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    const autoResize = useCallback(() => {
        const element = textRef.current;
        if (!element) return;

        element.style.height = 'auto';
        element.style.height = `${element.scrollHeight}px`;
    }, []);

    useLayoutEffect(autoResize, [autoResize, currentTask.title]);

    useEffect(() => {
        window.addEventListener('resize', autoResize);
        return () => window.removeEventListener('resize', autoResize);
    }, [autoResize]);

    useEffect(() => () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }, []);

    const handleDelete = () => {
        if (isRemoving) return;

        setIsRemoving(true);
        timeoutRef.current = setTimeout(onDelete, EXIT_DURATION);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key !== 'Enter') return;

        event.preventDefault();
        textRef.current?.blur();
    };

    return {
        currentTask,
        toggleTaskCompletion,
        updateTaskTitle,
        textRef,
        handleDelete,
        handleKeyDown,
        isRemoving,
    };
}

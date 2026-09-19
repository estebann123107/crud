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

type UseTaskOptions = {
    task: Task;
    onChange: (changes: Partial<Task>) => void;
    onDelete: () => void;
};

export const useTask = ({ task, onChange, onDelete }: UseTaskOptions) => {
    const [isRemoving, setIsRemoving] = useState(false);
    const textRef = useRef<HTMLTextAreaElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const toggleTaskCompletion = () => {
        onChange({ completed: !task.completed });
    };

    const updateTaskTitle = (newTitle: string) => {
        onChange({ title: newTitle });
    };

    const autoResize = useCallback(() => {
        const element = textRef.current;
        if (!element) return;

        element.style.height = 'auto';
        element.style.height = `${element.scrollHeight}px`;
    }, []);

    useLayoutEffect(autoResize, [autoResize, task.title]);

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
        toggleTaskCompletion,
        updateTaskTitle,
        textRef,
        handleDelete,
        handleKeyDown,
        isRemoving,
    };
}

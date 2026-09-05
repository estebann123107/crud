import { Task } from "@/app/types";
import { useState, useEffect } from "react";

export const useStorage = (key: string, initialValue: Task[]) => {
    const [storedValue, setStoredValue] = useState<Task[]>(initialValue);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item) setStoredValue(JSON.parse(item));
        } catch (error) {
            console.error("Error reading from localStorage", error);
        } finally {
            setIsHydrated(true);
        }
    }, [key]);

    useEffect(() => {
        if (!isHydrated) return;

        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error("Error writing to localStorage", error);
        }
    }, [isHydrated, key, storedValue]);

    return [storedValue, setStoredValue];
};

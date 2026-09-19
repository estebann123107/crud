import { useCallback, useSyncExternalStore } from "react";
import { TaskList } from "@/app/types";

type Listener = () => void;
type TaskListUpdate = TaskList | ((previousTasks: TaskList) => TaskList);

const EMPTY_LIST: TaskList = [];

/* Cada clave de almacenamiento tiene una sola instantánea compartida, así que
   todos los hooks que la leen ven la misma lista y se actualizan a la vez. */
const snapshots = new Map<string, TaskList>();
const listeners = new Map<string, Set<Listener>>();

let isWatchingStorage = false;

const readFromStorage = (key: string): TaskList => {
  try {
    const item = window.localStorage.getItem(key);
    if (!item) return EMPTY_LIST;

    const parsedItem: unknown = JSON.parse(item);
    return Array.isArray(parsedItem) ? (parsedItem as TaskList) : EMPTY_LIST;
  } catch (error) {
    console.error("Error reading from localStorage", error);
    return EMPTY_LIST;
  }
};

const getSnapshot = (key: string): TaskList => {
  const snapshot = snapshots.get(key);
  if (snapshot) return snapshot;

  const storedTasks = readFromStorage(key);
  snapshots.set(key, storedTasks);

  return storedTasks;
};

const getServerSnapshot = (): TaskList => EMPTY_LIST;

const emitChange = (key: string) => {
  listeners.get(key)?.forEach((listener) => listener());
};

/* Otra pestaña escribió: la instantánea cacheada ya no sirve. */
const handleStorage = (event: StorageEvent) => {
  if (!event.key || !listeners.has(event.key)) return;

  snapshots.delete(event.key);
  emitChange(event.key);
};

const watchStorage = () => {
  if (isWatchingStorage) return;

  window.addEventListener("storage", handleStorage);
  isWatchingStorage = true;
};

const subscribe = (key: string, listener: Listener) => {
  watchStorage();

  const listenersForKey = listeners.get(key) ?? new Set<Listener>();
  listenersForKey.add(listener);
  listeners.set(key, listenersForKey);

  return () => {
    listenersForKey.delete(listener);
  };
};

const writeToStorage = (key: string, tasks: TaskList) => {
  snapshots.set(key, tasks);

  try {
    window.localStorage.setItem(key, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error writing to localStorage", error);
  }

  emitChange(key);
};

export const useStorage = (
  key: string,
): [TaskList, (update: TaskListUpdate) => void] => {
  const tasks = useSyncExternalStore(
    useCallback((listener: Listener) => subscribe(key, listener), [key]),
    useCallback(() => getSnapshot(key), [key]),
    getServerSnapshot,
  );

  const setTasks = useCallback(
    (update: TaskListUpdate) => {
      const nextTasks =
        typeof update === "function" ? update(getSnapshot(key)) : update;

      writeToStorage(key, nextTasks);
    },
    [key],
  );

  return [tasks, setTasks];
};

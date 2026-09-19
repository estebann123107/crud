import { useSyncExternalStore } from "react";

const STORAGE_KEY = "todo-aside-expanded";
const DEFAULT_EXPANDED = true;

const listeners = new Set<() => void>();

const readExpandedFromStorage = (): boolean | null => {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (value === null) return null;

    return value === "true";
  } catch (error) {
    console.error("Error reading aside state", error);
    return null;
  }
};

const getSnapshot = (): boolean =>
  readExpandedFromStorage() ?? DEFAULT_EXPANDED;

const getServerSnapshot = (): boolean => DEFAULT_EXPANDED;

const emitChange = () => {
  listeners.forEach((listener) => listener());
};

const handleStorage = (event: StorageEvent) => {
  if (event.key === STORAGE_KEY) emitChange();
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
};

const writeExpandedToStorage = (isExpanded: boolean) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(isExpanded));
  } catch (error) {
    console.error("Error saving aside state", error);
  }
};

const setAsideExpanded = (value: boolean | ((prev: boolean) => boolean)) => {
  const nextValue = typeof value === "function" ? value(getSnapshot()) : value;

  writeExpandedToStorage(nextValue);
  emitChange();
};

export const useAsideState = () => {
  const isExpanded = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return { isExpanded, setIsExpanded: setAsideExpanded };
};
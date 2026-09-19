import { useSyncExternalStore } from "react";
import { MenuView } from "@/app/types";

const STORAGE_KEY = "todo-menu-view";
const QUERY_PARAM = "view";
const DEFAULT_VIEW: MenuView = "tasks";
const VIEWS: MenuView[] = ["tasks", "paper-bin"];

const listeners = new Set<() => void>();

const isMenuView = (value: string | null): value is MenuView =>
  value !== null && (VIEWS as string[]).includes(value);

const readViewFromUrl = (): MenuView | null => {
  if (typeof window === "undefined") return null;

  const value = new URLSearchParams(window.location.search).get(QUERY_PARAM);
  return isMenuView(value) ? value : null;
};

const readViewFromStorage = (): MenuView | null => {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return isMenuView(value) ? value : null;
  } catch (error) {
    console.error("Error reading menu view", error);
    return null;
  }
};

const getSnapshot = (): MenuView =>
  readViewFromUrl() ?? readViewFromStorage() ?? DEFAULT_VIEW;

const getServerSnapshot = (): MenuView => DEFAULT_VIEW;

const emitChange = () => {
  listeners.forEach((listener) => listener());
};

const writeViewToUrl = (view: MenuView) => {
  const url = new URL(window.location.href);
  url.searchParams.set(QUERY_PARAM, view);
  window.history.replaceState(null, "", url);
};

const handleStorage = (event: StorageEvent) => {
  if (event.key === STORAGE_KEY) emitChange();
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  window.addEventListener("popstate", listener);
  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("popstate", listener);
    window.removeEventListener("storage", handleStorage);
  };
};

const setMenuView = (view: MenuView) => {
  writeViewToUrl(view);

  try {
    window.localStorage.setItem(STORAGE_KEY, view);
  } catch (error) {
    console.error("Error saving menu view", error);
  }

  emitChange();
};

export const useMenuView = () => {
  const view = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return { view, setView: setMenuView };
};

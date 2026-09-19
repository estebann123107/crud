import { Task } from "@/app/types";
import { useStorage } from "./use-storage";

export const PAPER_BIN_STORAGE_KEY = "paper-bin";

export const usePaperBin = () => {
  const [deletedTasks, setDeletedTasks] = useStorage(PAPER_BIN_STORAGE_KEY);

  const handleAddTask = (task: Task) => {
    setDeletedTasks((previousTasks) =>
      previousTasks.some((previousTask) => previousTask.id === task.id)
        ? previousTasks
        : [...previousTasks, task],
    );
  };

  const handleRestoreTask = (taskId: string) => {
    const task = deletedTasks.find((currentTask) => currentTask.id === taskId);

    if (!task) return undefined;

    setDeletedTasks((previousTasks) =>
      previousTasks.filter((currentTask) => currentTask.id !== taskId),
    );

    return task;
  };

  const handleDeletePermanently = (taskId: string) => {
    setDeletedTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId),
    );
  };

  const handleEmpty = () => {
    setDeletedTasks([]);
  };

  const findTaskById = (taskId: string): Task | undefined => {
    return deletedTasks.find((task) => task.id === taskId);
  };

  return {
    deletedTasks,
    handleAddTask,
    handleRestoreTask,
    handleDeletePermanently,
    handleEmpty,
    findTaskById,
  };
};
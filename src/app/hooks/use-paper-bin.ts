import { Task, TaskList } from "@/app/types";
import { useStorage } from "./use-storage";

export const usePaperBin = () => {
  const [deletedTasks, setDeletedTasks] = useStorage("paper-bin", []) as [
    TaskList,
    React.Dispatch<React.SetStateAction<TaskList>>,
  ];

  const handleAddTask = (task: Task) => {
    setDeletedTasks((previousTasks) => [...previousTasks, task]);
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
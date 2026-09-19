"use client";

import { Task, TaskList } from "@/app/types";
import { useMenuView } from "@/app/hooks/use-menu-view";
import { usePaperBin } from "@/app/hooks/use-paper-bin";
import { PaperBinComponent } from "./paper-bin-componet";
import { TaskListComponent } from "./task-list-component";

const TASK_STORAGE_KEY = "todo-list";

export const MainComponent = () => {
  const { view } = useMenuView();
  const {
    deletedTasks,
    handleRestoreTask,
    handleDeletePermanently,
    handleEmpty,
  } = usePaperBin();

  const handleRestore = (task: Task) => {
    handleRestoreTask(task.id);

    try {
      const storedTasks = window.localStorage.getItem(TASK_STORAGE_KEY);
      const tasks = storedTasks ? (JSON.parse(storedTasks) as TaskList) : [];
      const alreadyExists = tasks.some(
        (currentTask) => currentTask.id === task.id,
      );

      if (!alreadyExists) {
        window.localStorage.setItem(
          TASK_STORAGE_KEY,
          JSON.stringify([...tasks, task]),
        );
      }
    } catch (error) {
      console.error("Error restoring task", error);
    }
  };

  if (view === "paper-bin") {
    return (
      <PaperBinComponent
        deletedTasks={deletedTasks}
        onRestore={handleRestore}
        onDeletePermanently={handleDeletePermanently}
        onEmpty={handleEmpty}
      />
    );
  }

  return <TaskListComponent />;
};

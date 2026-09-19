"use client";

import { Task } from "@/app/types";
import { useList } from "@/app/hooks/use-list";
import { useMenuView } from "@/app/hooks/use-menu-view";
import { usePaperBin } from "@/app/hooks/use-paper-bin";
import { PaperBinComponent } from "./paper-bin-componet";
import { TaskListComponent } from "./task-list-component";

export const MainComponent = () => {
  const { view } = useMenuView();
  const { handleAddTask } = useList();
  const {
    deletedTasks,
    handleRestoreTask,
    handleDeletePermanently,
    handleEmpty,
  } = usePaperBin();

  const handleRestore = (task: Task) => {
    handleRestoreTask(task.id);
    handleAddTask(task);
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

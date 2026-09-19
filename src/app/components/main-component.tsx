"use client";

import { useMenuView } from "@/app/hooks/use-menu-view";
import { usePaperBin } from "@/app/hooks/use-paper-bin";
import { PaperBinComponent } from "./paper-bin-componet";
import { TaskListComponent } from "./task-list-component";

export const MainComponent = () => {
  const { view } = useMenuView();
  const {
    deletedTasks,
    handleRestoreTask,
    handleDeletePermanently,
    handleEmpty,
  } = usePaperBin();

  if (view === "paper-bin") {
    return (
      <PaperBinComponent
        deletedTasks={deletedTasks}
        onRestore={(task) => handleRestoreTask(task.id)}
        onDeletePermanently={handleDeletePermanently}
        onEmpty={handleEmpty}
      />
    );
  }

  return <TaskListComponent />;
};

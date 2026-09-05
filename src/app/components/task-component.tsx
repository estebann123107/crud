"use client";

import {
  CSSProperties,
} from "react";
import { useTask } from "@/app/hooks/use-task";
import { Task } from "@/app/types";
import { TrashIcon } from "@/app/icons/trash-icon";
import { CheckIcon } from "@/app/icons/check-icon";

type TaskComponentProps = {
  currentTask: Task;
  onDelete: () => void;
  index?: number;
};

export const TaskComponent = ({
  currentTask: task,
  onDelete,
  index = 0,
}: TaskComponentProps) => {
  const {
    currentTask,
    updateTaskTitle,
    toggleTaskCompletion,
    textRef,
    handleDelete,
    handleKeyDown,
    isRemoving,
  } = useTask(task, onDelete);

  const className = [
    "task-container",
    currentTask.completed ? "is-done" : "",
    isRemoving ? "is-removing" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={className}
      style={{ "--task-index": index } as CSSProperties}
    >
      <div className="task-left">
        <div className="task-check-label">
          <input
            type="checkbox"
            checked={currentTask.completed}
            onChange={toggleTaskCompletion}
            className="task-check-input"
            aria-label={`Marcar "${currentTask.title}" como completada`}
          />
          <CheckIcon className="task-check-icon" width={12} height={12} />
        </div>

        <div className="task-text-label">
          <span className="sr-only">Título de la tarea</span>
          <textarea
            ref={textRef}
            value={currentTask.title}
            onChange={(event) => updateTaskTitle(event.target.value)}
            onKeyDown={handleKeyDown}
            className="task-text-input"
            rows={1}
          />
        </div>
      </div>

      <button
        type="button"
        className="delete-button"
        onClick={handleDelete}
        aria-label={`Eliminar ${currentTask.title}`}
      >
        <TrashIcon width={16} height={16} strokeWidth={1.5} />
      </button>
    </article>
  );
};
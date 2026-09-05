"use client";

import { Task } from "@/app/types";
import { useList } from "../hooks/use-list";
import { TaskComponent } from "./task-component";

export const TaskListComponent = () => {
  const {
    tasks,
    handleDeleteTask,
    newTaskTitle,
    updateNewTaskTitle,
    inputRef,
    title,
    handleSubmit,
  } = useList();

  return (
    <>
      <p className="task-count">
        <span className="task-count-number">{tasks.length}</span>{" "}
        {tasks.length === 1 ? "tarea" : "tareas"}
      </p>

      <form className="add-task-form" onSubmit={handleSubmit}>
        <label htmlFor="new-task">Nueva tarea</label>
        <div className="add-task-row">
          <input
            id="new-task"
            ref={inputRef}
            type="text"
            className="new-task-input"
            value={newTaskTitle}
            onChange={(event) => updateNewTaskTitle(event.target.value)}
            placeholder="¿Qué necesitas hacer?"
            autoComplete="off"
          />
          <button type="submit" className="add-button" disabled={!title}>
            Añadir
          </button>
        </div>
      </form>

      {tasks.length === 0 ? (
        <p className="empty-list" role="status">
          No hay tareas pendientes. Añade la primera desde el campo de arriba.
        </p>
      ) : (
        <section className="task-list" aria-label="Lista de tareas">
          {tasks.map((task: Task, index: number) => (
            <TaskComponent
              key={task.id}
              currentTask={task}
              index={index}
              onDelete={() => handleDeleteTask(task.id)}
            />
          ))}
        </section>
      )}
    </>
  );
};
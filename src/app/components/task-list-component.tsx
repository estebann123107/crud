"use client";

import { Task } from "@/app/types";
import { ListTodoIcon } from "@/app/icons/list-todo-icon";
import { useList } from "../hooks/use-list";
import { TaskComponent } from "./task-component";

export const TaskListComponent = () => {
  const {
    tasks,
    handleDeleteTask,
    handleUpdateTask,
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
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={!title}
          >
            Añadir
          </button>
        </div>
      </form>

      {tasks.length === 0 ? (
        <div className="empty-state" role="status">
          <ListTodoIcon className="empty-state-icon" size={22} strokeWidth={1.6} />
          <p>No hay tareas pendientes.</p>
          <p className="empty-state-hint">
            Añade la primera desde el campo de arriba.
          </p>
        </div>
      ) : (
        <section className="task-list" aria-label="Lista de tareas">
          {tasks.map((task: Task, index: number) => (
            <TaskComponent
              key={task.id}
              currentTask={task}
              index={index}
              onChange={(changes) => handleUpdateTask(task.id, changes)}
              onDelete={() => handleDeleteTask(task.id)}
            />
          ))}
        </section>
      )}
    </>
  );
};
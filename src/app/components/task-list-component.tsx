"use client";

import { Task } from "@/app/types";
import { useList } from "../hooks/use-list";
import { ListTodoIcon } from "@/app/icons/list-todo-icon";
import { TaskComponent } from "./task-component";
import { ViewHeaderComponent } from "./view-header-component";

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

  const completedCount = tasks.filter((task) => task.completed).length;
  const completedRatio = tasks.length ? completedCount / tasks.length : 0;

  return (
    <section className="view" aria-labelledby="tasks-title">
      <ViewHeaderComponent
        titleId="tasks-title"
        eyebrow="Organiza tu día"
        title="Mis tareas"
        meta={
          <div className="progress">
            <div
              className="progress-track"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={tasks.length}
              aria-valuenow={completedCount}
              aria-label="Tareas completadas"
            >
              <div
                className="progress-value"
                style={{ inlineSize: `${completedRatio * 100}%` }}
              />
            </div>
            <p className="progress-label">
              <span className="numeric">{completedCount}</span> de{" "}
              <span className="numeric">{tasks.length}</span> completadas
            </p>
          </div>
        }
      />

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
          <ListTodoIcon
            className="empty-state-icon"
            size={22}
            strokeWidth={1.6}
          />
          <p>No hay tareas pendientes.</p>
          <p className="empty-state-hint">
            Añade la primera desde el campo de arriba.
          </p>
        </div>
      ) : (
        <div className="task-list" aria-label="Lista de tareas">
          {tasks.map((task: Task, index: number) => (
            <TaskComponent
              key={task.id}
              currentTask={task}
              index={index}
              onChange={(changes) => handleUpdateTask(task.id, changes)}
              onDelete={() => handleDeleteTask(task.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

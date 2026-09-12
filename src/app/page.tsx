import { TaskListComponent } from "./components/task-list-component";
import { ThemeToggle } from "./components/theme-toggle";

export default function TodoView() {
  return (
    <main className="todo-page">
      <section className="todo-panel" aria-labelledby="todo-title">
        <header className="todo-header">
          <p className="eyebrow">Organiza tu día</p>
          <div className="title-row">
            <h1 id="todo-title" className="todo-title">
              Mis tareas
              <span className="title-dot" aria-hidden="true">
                .
              </span>
            </h1>
            <ThemeToggle />
          </div>
        </header>
        <TaskListComponent />
      </section>
    </main>
  );
}
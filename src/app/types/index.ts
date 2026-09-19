export interface Task {
    id: string;
    title: string;
    completed: boolean;
}

export type TaskList = Task[];

export type MenuView = "tasks" | "paper-bin";

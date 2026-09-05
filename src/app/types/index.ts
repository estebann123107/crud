export interface Task {
    id: string;
    title: string;
    completed: boolean;
}

export type TaskList = Task[];

export type IconProps = {
    width?: number
    height?:number
    strokeWidth?: number
    color?: string
    className?: string
}

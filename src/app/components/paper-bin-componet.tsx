"use client";

import { Task } from "@/app/types";
import { RotateCcwIcon } from "@/app/icons/rotate-ccw-icon";
import { TrashIcon } from "@/app/icons/trash-icon";

type PaperBinComponentProps = {
	deletedTasks: Task[];
	onRestore: (task: Task) => void;
	onDeletePermanently: (taskId: string) => void;
	onEmpty: () => void;
};

export const PaperBinComponent = ({
	deletedTasks,
	onRestore,
	onDeletePermanently,
	onEmpty,
}: PaperBinComponentProps) => {
	return (
		<section className="paper-bin" aria-labelledby="paper-bin-title">
			<div className="paper-bin-header">
				<div>
					<h2 id="paper-bin-title" className="paper-bin-title">
						Papelera
					</h2>
					<p className="paper-bin-count">
						{deletedTasks.length} {deletedTasks.length === 1 ? "tarea" : "tareas"}
					</p>
				</div>

				{deletedTasks.length > 0 && (
					<button
						type="button"
						className="paper-bin-empty-button"
						onClick={onEmpty}
					>
						<TrashIcon size={14} strokeWidth={1.9} />
						Vaciar
					</button>
				)}
			</div>

			{deletedTasks.length === 0 ? (
				<p className="paper-bin-empty" role="status">
					La papelera está vacía.
				</p>
			) : (
				<ul className="paper-bin-list" aria-label="Tareas eliminadas">
					{deletedTasks.map((task) => (
						<li className="paper-bin-item" key={task.id}>
							<span className="paper-bin-task-title">{task.title}</span>
							<div className="paper-bin-actions">
								<button
									type="button"
									className="paper-bin-action"
									onClick={() => onRestore(task)}
								>
									<RotateCcwIcon size={14} strokeWidth={1.9} />
									Restaurar
								</button>
								<button
									type="button"
									className="paper-bin-action paper-bin-action-danger"
									onClick={() => onDeletePermanently(task.id)}
								>
									<TrashIcon size={14} strokeWidth={1.9} />
									Eliminar
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</section>
	);
};

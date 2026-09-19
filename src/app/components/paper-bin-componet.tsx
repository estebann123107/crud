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
						className="btn btn-secondary btn-sm"
						onClick={onEmpty}
					>
						<TrashIcon size={14} strokeWidth={1.9} />
						Vaciar
					</button>
				)}
			</div>

			{deletedTasks.length === 0 ? (
				<div className="empty-state" role="status">
					<TrashIcon className="empty-state-icon" size={22} strokeWidth={1.6} />
					<p>La papelera está vacía.</p>
					<p className="empty-state-hint">
						Lo que elimines aparecerá aquí.
					</p>
				</div>
			) : (
				<ul className="paper-bin-list" aria-label="Tareas eliminadas">
					{deletedTasks.map((task) => (
						<li className="paper-bin-item" key={task.id}>
							<span className="paper-bin-task-title">{task.title}</span>
							<div className="paper-bin-actions">
								<button
									type="button"
									className="btn btn-secondary btn-sm"
									onClick={() => onRestore(task)}
								>
									<RotateCcwIcon size={14} strokeWidth={1.9} />
									Restaurar
								</button>
								<button
									type="button"
									className="btn btn-danger btn-sm"
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

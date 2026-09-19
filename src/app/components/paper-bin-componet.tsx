"use client";

import { Task } from "@/app/types";
import { CheckIcon } from "@/app/icons/check-icon";
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
						<TrashIcon width={15} height={15} strokeWidth={1.7} />
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
									<CheckIcon width={15} height={15} strokeWidth={1.8} />
									Restaurar
								</button>
								<button
									type="button"
									className="paper-bin-action paper-bin-action-danger"
									onClick={() => onDeletePermanently(task.id)}
								>
									<TrashIcon width={15} height={15} strokeWidth={1.7} />
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

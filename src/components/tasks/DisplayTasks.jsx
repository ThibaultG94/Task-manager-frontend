import React, { useEffect, useState } from 'react';
import ModalTask from './ModalTask';
import { useDispatch, useSelector } from 'react-redux';
import { selectTasks } from '../../store/selectors/taskSelectors';
import {
	selectHasEdited,
	selectIsEditingField,
} from '../../store/selectors/editStateSelectors';
import { resetEditState } from '../../store/feature/editState.slice';
import { formatTaskForEditing } from '../utils/formatTaskForEditing';
import { setInitialEditedTask } from '../../store/feature/tasks.slice';
import { formatDateForDisplay } from '../utils/formatDateForDisplay';

const DisplayTasks = () => {
	const dispatch = useDispatch();
	const userTasks = useSelector(selectTasks);
	const isEditingField = useSelector(selectIsEditingField);
	const hasEdited = useSelector(selectHasEdited);
	const [displayTasks, setDisplayTasks] = useState([]);
	const [selectedTask, setSelectedTask] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = (e) => {
		e.stopPropagation();
		setIsModalOpen(true);
	};

	const closeModal = async () => {
		const checkIfEdited = async () => {
			const anyFieldEditing = Object.values(isEditingField).some(Boolean);
			if (anyFieldEditing || hasEdited) {
				let message;
				if (anyFieldEditing) {
					message =
						"Vous êtes en train d'éditer. Voulez-vous vraiment quitter sans sauvegarder ?";
				} else if (hasEdited) {
					message =
						'Vous avez des changements non sauvegardés. Voulez-vous vraiment quitter sans sauvegarder ?';
				}
				const userResponse = window.confirm(message);
				if (!userResponse) {
					return;
				}
			}
			setIsModalOpen(false);
			dispatch(resetEditState());
			const formattedTask = await formatTaskForEditing(selectedTask);
			dispatch(setInitialEditedTask(formattedTask));
		};

		await checkIfEdited();
	};

	useEffect(() => {
		const updateDisplayTasks = async () => {
			const updatedTasks = [];
			for (let i = 0; i < userTasks.length; i++) {
				if (userTasks && userTasks[i]) {
					const formattedDate = await formatDateForDisplay(
						userTasks[i].deadline
					);
					updatedTasks.push({
						title: userTasks[i].title,
						date: formattedDate,
						status: userTasks[i].status,
						priority: userTasks[i].priority,
						deadline: userTasks[i].deadline,
						description: userTasks[i].description,
						comments: userTasks[i].comments,
						workspace: userTasks[i].workspaceId,
						assignedTo: userTasks[i].assignedTo,
						taskId: userTasks[i]._id,
						isOverdue: formattedDate === 'En retard',
					});
				}
			}
			setDisplayTasks(updatedTasks);
		};

		updateDisplayTasks();
	}, [userTasks]);

	useEffect(() => {
		const resetEditedTask = async () => {
			const formattedTask = await formatTaskForEditing(selectedTask);
			if (formattedTask) {
				dispatch(setInitialEditedTask(formattedTask));
			}
		};
		resetEditedTask();
	}, [selectedTask]);

	return (
		<section id="tasks">
			<div
				id="retard-tasks"
				className="task-block"
				onClick={(e) => openModal(e)}>
				<div className="task-block-header">
					<h3>Retard</h3>
					<button className="toggle-button">▶</button>
				</div>
				<div className="task-list"></div>
			</div>

			<div
				id="today-tasks"
				className="task-block"
				onClick={(e) => openModal(e)}>
				<div className="task-block-header">
					<h3>Aujourd'hui</h3>
					<button className="toggle-button">▶</button>
				</div>
				<div className="task-list"></div>
			</div>

			<div
				id="tomorrow-tasks"
				className="task-block"
				onClick={(e) => openModal(e)}>
				<div className="task-block-header">
					<h3>Demain</h3>
					<button className="toggle-button">▶</button>
				</div>
				<div className="task-list"></div>
			</div>

			<div
				id="this-week-tasks"
				className="task-block"
				onClick={(e) => openModal(e)}>
				<div className="task-block-header">
					<h3>Cette semaine</h3>
					<button className="toggle-button">▶</button>
				</div>
				<div className="task-list"></div>
			</div>

			<div
				id="this-weekend-tasks"
				className="task-block"
				onClick={(e) => openModal(e)}>
				<div className="task-block-header">
					<h3>Ce Weekend</h3>
					<button className="toggle-button">▶</button>
				</div>
				<div className="task-list"></div>
			</div>

			<div
				id="next-week-tasks"
				className="task-block"
				onClick={(e) => openModal(e)}>
				<div className="task-block-header">
					<h3>Semaine prochaine</h3>
					<button className="toggle-button">▶</button>
				</div>
				<div className="task-list"></div>
			</div>

			<div
				id="next-weekend-tasks"
				className="task-block"
				onClick={(e) => openModal(e)}>
				<div className="task-block-header">
					<h3>Weekend prochain</h3>
					<button className="toggle-button">▶</button>
				</div>
				<div className="task-list"></div>
			</div>

			<div
				id="this-month-tasks"
				className="task-block"
				onClick={(e) => openModal(e)}>
				<div className="task-block-header">
					<h3>Ce mois-ci</h3>
					<button className="toggle-button">▶</button>
				</div>
				<div className="task-list"></div>
			</div>

			<div
				id="next-month-tasks"
				className="task-block"
				onClick={(e) => openModal(e)}>
				<div className="task-block-header">
					<h3>Mois prochain</h3>
					<button className="toggle-button">▶</button>
				</div>
				<div className="task-list"></div>
			</div>

			<div
				className="task-block"
				id="this-year-tasks"
				onClick={(e) => openModal(e)}>
				<div className="task-block-header">
					<h3>Cette année</h3>
					<button className="toggle-button">▶</button>
				</div>
				<div className="task-list"></div>
			</div>

			<div
				className="task-block"
				id="next-year-tasks"
				onClick={(e) => openModal(e)}>
				<div className="task-block-header">
					<h3>Année prochaine</h3>
					<button className="toggle-button">▶</button>
				</div>
				<div className="task-list"></div>
			</div>

			<div
				className="task-block"
				id="becoming-tasks"
				onClick={(e) => openModal(e)}>
				<div className="task-block-header">
					<h3>Prochaines années</h3>
					<button className="toggle-button">▶</button>
				</div>
				<div className="task-list"></div>
			</div>

			<div
				className="task-block"
				id="archived-tasks"
				onClick={(e) => openModal(e)}>
				<div className="task-block-header">
					<h3>Archives</h3>
					<button className="toggle-button">▶</button>
				</div>
				<div className="task-list"></div>
			</div>

			{isModalOpen && (
				<ModalTask
					closeModal={closeModal}
					setIsModalOpen={setIsModalOpen}
				/>
			)}
		</section>
	);
};

export default DisplayTasks;

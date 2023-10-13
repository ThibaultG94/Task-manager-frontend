import React, { useEffect, useState } from 'react';
import ModalTask from './ModalTask';
import { useDispatch, useSelector } from 'react-redux';
import { selectShortTermTasks } from '../../store/selectors/taskSelectors';
import {
	selectHasEdited,
	selectIsEditingField,
} from '../../store/selectors/editStateSelectors';
import { resetEditState } from '../../store/feature/editState.slice';
import { formatTaskForEditing } from '../utils/formatTaskForEditing';
import { setInitialEditedTask } from '../../store/feature/tasks.slice';
import { formatDateForDisplay } from '../utils/formatDateForDisplay';
import { getCategoryDay } from '../utils/getCategoryDay';
import { convertStatus } from '../utils/convertStatus';
import { convertPriority } from '../utils/convertPriority';
import TaskItem from './TaskItem';

const DisplayTasks = () => {
	const dispatch = useDispatch();
	const userShortTermTasks = useSelector(selectShortTermTasks);
	const isEditingField = useSelector(selectIsEditingField);
	const hasEdited = useSelector(selectHasEdited);
	const [displayShortTermTasks, setDisplayShortTermTasks] = useState([]);
	const [selectedTask, setSelectedTask] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [expandedBlocks, setExpandedBlocks] = useState({
		'retard-tasks': true,
		'today-tasks': true,
		'tomorrow-tasks': true,
	});

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

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
		const updateDisplayShortTermTasks = async () => {
			const updatedTasks = [];
			for (let i = 0; i < userShortTermTasks.length; i++) {
				if (userShortTermTasks && userShortTermTasks[i]) {
					const formattedDate = await formatDateForDisplay(
						userShortTermTasks[i].deadline
					);
					const day = await formatDateForDisplay(
						userShortTermTasks[i].deadline
					);
					const category = await getCategoryDay(
						day,
						userShortTermTasks[i].status,
						userShortTermTasks[i].deadline
					);
					const convertedStatus = await convertStatus(
						userShortTermTasks[i].status
					);
					const convertedPriority = await convertPriority(
						userShortTermTasks[i].priority
					);
					updatedTasks.push({
						title: userShortTermTasks[i].title,
						date: formattedDate,
						status: userShortTermTasks[i].status,
						convertedStatus: convertedStatus,
						priority: userShortTermTasks[i].priority,
						convertedPriority: convertedPriority,
						deadline: userShortTermTasks[i].deadline,
						description: userShortTermTasks[i].description,
						comments: userShortTermTasks[i].comments,
						workspace: userShortTermTasks[i].workspaceId,
						assignedTo: userShortTermTasks[i].assignedTo,
						taskId: userShortTermTasks[i]._id,
						category: category,
						day: day,
					});
				}
			}
			setDisplayShortTermTasks(updatedTasks);
		};

		updateDisplayShortTermTasks();
	}, [userShortTermTasks]);

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
				className={`task-block ${
					expandedBlocks['retard-tasks'] ? 'expanded' : ''
				}`}
				onClick={() => toggleBlock('retard-tasks')}>
				<div className="task-block-header">
					<h3>Retard</h3>
					<button
						className="toggle-button"
						onClick={(e) => {
							e.stopPropagation();
							toggleBlock('retard-tasks');
						}}>
						▶
					</button>
				</div>
				<div className="task-list">
					{displayShortTermTasks && displayShortTermTasks?.length > 0
						? displayShortTermTasks
								.filter(
									(task) => task.category === 'retard-tasks'
								)
								.map((task, index) => (
									<TaskItem
										task={task}
										openModal={openModal}
										key={index}
										setSelectedTask={setSelectedTask}
									/>
								))
						: null}
				</div>
			</div>

			<div
				id="today-tasks"
				className={`task-block ${
					expandedBlocks['today-tasks'] ? 'expanded' : ''
				}`}>
				<div className="task-block-header">
					<h3>Aujourd'hui</h3>
					<button
						className="toggle-button"
						onClick={(e) => {
							e.stopPropagation();
							toggleBlock('today-tasks');
						}}>
						▶
					</button>
				</div>
				<div className="task-list">
					{displayShortTermTasks && displayShortTermTasks?.length > 0
						? displayShortTermTasks
								.filter(
									(task) => task.category === 'today-tasks'
								)
								.map((task, index) => (
									<TaskItem
										task={task}
										openModal={openModal}
										key={index}
										setSelectedTask={setSelectedTask}
									/>
								))
						: null}
				</div>
			</div>

			<div
				id="tomorrow-tasks"
				className={`task-block ${
					expandedBlocks['tomorrow-tasks'] ? 'expanded' : ''
				}`}>
				<div className="task-block-header">
					<h3>Demain</h3>
					<button
						className="toggle-button"
						onClick={(e) => {
							e.stopPropagation();
							toggleBlock('tomorrow-tasks');
						}}>
						▶
					</button>
				</div>
				<div className="task-list">
					{displayShortTermTasks && displayShortTermTasks?.length > 0
						? displayShortTermTasks
								.filter(
									(task) => task.category === 'tomorrow-tasks'
								)
								.map((task, index) => (
									<TaskItem
										task={task}
										openModal={openModal}
										key={index}
										setSelectedTask={setSelectedTask}
									/>
								))
						: null}
				</div>
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

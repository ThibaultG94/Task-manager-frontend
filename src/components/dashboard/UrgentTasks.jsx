import React, { useEffect, useRef, useState } from 'react';
import ModalTask from '../tasks/ModalTask';
import { useSelector } from 'react-redux';
import { selectUrgentTasks } from '../../store/selectors/taskSelectors';
import { formatDateForDisplay } from '../utils/formatDateForDisplay';

const UrgentTasks = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const modalRef = useRef(null);
	const urgentTasks = useSelector(selectUrgentTasks);
	const [displayTasks, setDisplayTasks] = useState([]);
	const [selectedTask, setSelectedTask] = useState(null);

	const openModal = (e) => {
		e.stopPropagation();
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleClickOutside = (e) => {
		if (modalRef.current && !modalRef.current.contains(e.target)) {
			closeModal();
		}
	};

	useEffect(() => {
		const updateDisplayTasks = async () => {
			const updatedTasks = [];
			for (let i = 0; i < 3; i++) {
				if (urgentTasks && urgentTasks[i]) {
					const formattedDate = await formatDateForDisplay(
						urgentTasks[i].deadline
					);
					updatedTasks.push({
						title: urgentTasks[i].title,
						date: formattedDate,
						isOverdue: formattedDate === 'En retard',
					});
				}
			}
			setDisplayTasks(updatedTasks);
		};

		updateDisplayTasks();
	}, [urgentTasks]);

	useEffect(() => {
		if (isModalOpen) {
			window.addEventListener('click', handleClickOutside);
		} else {
			window.removeEventListener('click', handleClickOutside);
		}
	}, [isModalOpen]);

	return (
		<div className="tasks-container dashboard-card">
			<h4 className="pl-4">Tâches urgentes</h4>
			<div className="urgent-task-container">
				{displayTasks?.length > 0 ? (
					displayTasks.map((task, index) => (
						<div
							className={`urgent-task ${
								task ? 'task-overdue' : ''
							}`}
							key={index}
							onClick={(e) => {
								openModal(e);
								setSelectedTask(task);
							}}>
							<div className="urgent-task-todo">
								<div id="check"></div>
								<div>{task.title}</div>
							</div>
							<div className="date-container">
								<div className="date">{task.date}</div>
							</div>
						</div>
					))
				) : (
					<div className="no-urgent-tasks">
						<p>Aucune tâche à afficher</p>
					</div>
				)}
			</div>

			{isModalOpen && (
				<ModalTask
					closeModal={closeModal}
					modalRef={modalRef}
					task={selectedTask}
				/>
			)}
		</div>
	);
};

export default UrgentTasks;

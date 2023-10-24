import React, { useEffect, useState } from 'react';
import ModalTask from './ModalTask';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectHasEdited,
	selectIsEditingField,
} from '../../store/selectors/editStateSelectors';
import { resetEditState } from '../../store/feature/editState.slice';
import { formatTaskForEditing } from '../utils/formatTaskForEditing';
import { setInitialEditedTask } from '../../store/feature/tasks.slice';
import DisplayArchivedTasks from './DisplayArchivedTasks';
import DisplayOverdueTasks from './DisplayOverdueTasks';
import DisplayTodayTasks from './DisplayTodayTasks';
import DisplayTomorrowTasks from './DisplayTomorrowTasks';
import DisplayThisWeekTasks from './DisplayThisWeekTasks';
import DisplayThisWeekendTasks from './DisplayThisWeekendTasks';
import DisplayNextWeekTasks from './DisplayNextWeekTasks';
import DisplayNextWeekendTasks from './DisplayNextWeekendTasks';

const DisplayTasks = () => {
	const dispatch = useDispatch();
	const isEditingField = useSelector(selectIsEditingField);
	const hasEdited = useSelector(selectHasEdited);
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
			<DisplayOverdueTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
			/>

			<DisplayTodayTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
			/>

			<DisplayTomorrowTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
			/>

			<DisplayThisWeekTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
			/>

			<DisplayThisWeekendTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
			/>

			<DisplayNextWeekTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
			/>

			<DisplayNextWeekendTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
			/>

			<DisplayArchivedTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
			/>

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

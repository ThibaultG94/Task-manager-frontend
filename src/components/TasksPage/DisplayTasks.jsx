import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectHasEdited,
	selectIsEditingField,
} from '../../store/selectors/editStateSelectors';
import {
	selectBecomingTasks,
	selectNextMonthTasks,
	selectNextWeekTasks,
	selectNextYearTasks,
	selectOverdueTasks,
	selectThisMonthTasks,
	selectThisWeekTasks,
	selectThisYearTasks,
	selectTodayTasks,
	selectTomorrowTasks,
} from '../../store/selectors/taskSelectors';
import { resetEditState } from '../../store/feature/editState.slice';
import { setInitialEditedTask } from '../../store/feature/tasks.slice';
import { useGetComments } from '../../api/comments/useGetComments';
import { formatTaskForEditing } from '../../utils/formatTaskForEditing';
import DisplayOverdueTasks from './DisplayOverdueTasks';
import DisplayTodayTasks from './DisplayTodayTasks';
import DisplayTomorrowTasks from './DisplayTomorrowTasks';
import DisplayThisWeekTasks from './DisplayThisWeekTasks';
import DisplayNextWeekTasks from './DisplayNextWeekTasks';
import DisplayThisMonthTasks from './DisplayThisMonthTasks';
import DisplayNextMonthTasks from './DisplayNextMonthTasks';
import DisplayThisYearTasks from './DisplayThisYearTasks';
import DisplayNextYearTasks from './DisplayNextYearTasks';
import DisplayBecomingTasks from './DisplayBecomingTasks';
import DisplayArchivedTasks from './DisplayArchivedTasks';
import HandleModalTask from '../ModalTask/HandleModalTask';

const DisplayTasks = () => {
	const dispatch = useDispatch();
	const isEditingField = useSelector(selectIsEditingField);
	const hasEdited = useSelector(selectHasEdited);

	const [selectedTask, setSelectedTask] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const allTasks = {
		userOverdueTasks: useSelector(selectOverdueTasks),
		userTodayTasks: useSelector(selectTodayTasks),
		userTomorrowTasks: useSelector(selectTomorrowTasks),
		userThisWeekTasks: useSelector(selectThisWeekTasks),
		userNextWeekTasks: useSelector(selectNextWeekTasks),
		userThisMonthTasks: useSelector(selectThisMonthTasks),
		userNextMonthTasks: useSelector(selectNextMonthTasks),
		userThisYearTasks: useSelector(selectThisYearTasks),
		userNextYearTasks: useSelector(selectNextYearTasks),
		userBecomingTasks: useSelector(selectBecomingTasks),
	};

	const getComments = useGetComments();

	const [expandedBlocks, setExpandedBlocks] = useState({
		'retard-tasks': true,
		'today-tasks': true,
		'tomorrow-tasks': true,
		'this-week-tasks': true,
		'next-week-tasks': false,
		'this-month-tasks': false,
		'next-month-tasks': false,
		'this-year-tasks': false,
		'becoming-tasks': false,
		'archived-tasks': false,
	});

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
			setIsEditing(false);
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
			if (selectedTask) await getComments(selectedTask?.taskId);
		};
		resetEditedTask();
	}, [selectedTask]);

	return (
		<section className='max-w-screen-xl mx-auto container'>
			<DisplayOverdueTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
				allTasks={allTasks}
				expandedBlocks={expandedBlocks}
				setExpandedBlocks={setExpandedBlocks}
			/>

			<DisplayTodayTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
				allTasks={allTasks}
				expandedBlocks={expandedBlocks}
				setExpandedBlocks={setExpandedBlocks}
			/>

			<DisplayTomorrowTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
				allTasks={allTasks}
				expandedBlocks={expandedBlocks}
				setExpandedBlocks={setExpandedBlocks}
			/>

			<DisplayThisWeekTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
				allTasks={allTasks}
				expandedBlocks={expandedBlocks}
				setExpandedBlocks={setExpandedBlocks}
			/>

			<DisplayNextWeekTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
				allTasks={allTasks}
				expandedBlocks={expandedBlocks}
				setExpandedBlocks={setExpandedBlocks}
			/>

			<DisplayThisMonthTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
				allTasks={allTasks}
				expandedBlocks={expandedBlocks}
				setExpandedBlocks={setExpandedBlocks}
			/>

			<DisplayNextMonthTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
				allTasks={allTasks}
				expandedBlocks={expandedBlocks}
				setExpandedBlocks={setExpandedBlocks}
			/>

			<DisplayThisYearTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
				allTasks={allTasks}
				expandedBlocks={expandedBlocks}
				setExpandedBlocks={setExpandedBlocks}
			/>

			<DisplayNextYearTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
				allTasks={allTasks}
				expandedBlocks={expandedBlocks}
				setExpandedBlocks={setExpandedBlocks}
			/>

			<DisplayBecomingTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
				expandedBlocks={expandedBlocks}
				allTasks={allTasks}
				setExpandedBlocks={setExpandedBlocks}
			/>

			<DisplayArchivedTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
			/>

			{isModalOpen && (
				<HandleModalTask
					closeModal={closeModal}
					setIsModalOpen={setIsModalOpen}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
				/>
			)}
		</section>
	);
};

export default DisplayTasks;

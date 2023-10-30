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
import DisplayThisMonthTasks from './DisplayThisMonthTasks';
import DisplayNextMonthTasks from './DisplayNextMonthTasks';
import DisplayThisYearTasks from './DisplayThisYearTasks';
import DisplayNextYearTasks from './DisplayNextYearTasks';
import DisplayBecomingTasks from './DisplayBecomingTasks';
import {
	selectBecomingTasks,
	selectNextMonthTasks,
	selectNextWeekTasks,
	selectNextWeekendTasks,
	selectNextYearTasks,
	selectOverdueTasks,
	selectThisMonthTasks,
	selectThisWeekTasks,
	selectThisWeekendTasks,
	selectThisYearTasks,
	selectTodayTasks,
	selectTomorrowTasks,
} from '../../store/selectors/taskSelectors';

const DisplayTasks = () => {
	const dispatch = useDispatch();
	const isEditingField = useSelector(selectIsEditingField);
	const hasEdited = useSelector(selectHasEdited);
	const [selectedTask, setSelectedTask] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const userOverdueTasks = useSelector(selectOverdueTasks);
	const userTodayTasks = useSelector(selectTodayTasks);
	const userTomorrowTasks = useSelector(selectTomorrowTasks);
	const userThisWeekTasks = useSelector(selectThisWeekTasks);
	const userThisWeekendTasks = useSelector(selectThisWeekendTasks);
	const userNextWeekTasks = useSelector(selectNextWeekTasks);
	const userNextWeekendTasks = useSelector(selectNextWeekendTasks);
	const userThisMonthTasks = useSelector(selectThisMonthTasks);
	const userNextMonthTasks = useSelector(selectNextMonthTasks);
	const userThisYearTasks = useSelector(selectThisYearTasks);
	const userNextYearTasks = useSelector(selectNextYearTasks);
	const userBecomingTasks = useSelector(selectBecomingTasks);

	const [expandedBlocks, setExpandedBlocks] = useState({
		'overdue-tasks': true,
		'today-tasks': true,
		'tomorrow-tasks': true,
		'this-week-tasks': false,
		'this-weekend-tasks': false,
		'next-week-tasks': false,
		'next-weekend-tasks': false,
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
				userOverdueTasks={userOverdueTasks}
				expandedBlocks={expandedBlocks}
				setExpandedBlocks={setExpandedBlocks}
			/>

			<DisplayTodayTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
				userTodayTasks={userTodayTasks}
				expandedBlocks={expandedBlocks}
				setExpandedBlocks={setExpandedBlocks}
			/>

			<DisplayTomorrowTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
				userTomorrowTasks={userTomorrowTasks}
				expandedBlocks={expandedBlocks}
				setExpandedBlocks={setExpandedBlocks}
			/>

			<DisplayThisWeekTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
				userOverdueTasks={userOverdueTasks}
				userTodayTasks={userTodayTasks}
				userTomorrowTasks={userTomorrowTasks}
				userThisWeekTasks={userThisWeekTasks}
				expandedBlocks={expandedBlocks}
				setExpandedBlocks={setExpandedBlocks}
			/>

			<DisplayThisWeekendTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
				userOverdueTasks={userOverdueTasks}
				userTodayTasks={userTodayTasks}
				userTomorrowTasks={userTomorrowTasks}
				userThisWeekTasks={userThisWeekTasks}
				userThisWeekendTasks={userThisWeekendTasks}
				expandedBlocks={expandedBlocks}
				setExpandedBlocks={setExpandedBlocks}
			/>

			<DisplayNextWeekTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
				userOverdueTasks={userOverdueTasks}
				userTodayTasks={userTodayTasks}
				userTomorrowTasks={userTomorrowTasks}
				userThisWeekTasks={userThisWeekTasks}
				userThisWeekendTasks={userThisWeekendTasks}
				userNextWeekTasks={userNextWeekTasks}
				expandedBlocks={expandedBlocks}
				setExpandedBlocks={setExpandedBlocks}
			/>

			<DisplayNextWeekendTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
				userOverdueTasks={userOverdueTasks}
				userTodayTasks={userTodayTasks}
				userTomorrowTasks={userTomorrowTasks}
				userThisWeekTasks={userThisWeekTasks}
				userThisWeekendTasks={userThisWeekendTasks}
				userNextWeekTasks={userNextWeekTasks}
				userNextWeekendTasks={userNextWeekendTasks}
				expandedBlocks={expandedBlocks}
				setExpandedBlocks={setExpandedBlocks}
			/>

			<DisplayThisMonthTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
				userOverdueTasks={userOverdueTasks}
				userTodayTasks={userTodayTasks}
				userTomorrowTasks={userTomorrowTasks}
				userThisWeekTasks={userThisWeekTasks}
				userThisWeekendTasks={userThisWeekendTasks}
				userNextWeekTasks={userNextWeekTasks}
				userNextWeekendTasks={userNextWeekendTasks}
				userThisMonthTasks={userThisMonthTasks}
				expandedBlocks={expandedBlocks}
				setExpandedBlocks={setExpandedBlocks}
			/>

			<DisplayNextMonthTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
				userOverdueTasks={userOverdueTasks}
				userTodayTasks={userTodayTasks}
				userTomorrowTasks={userTomorrowTasks}
				userThisWeekTasks={userThisWeekTasks}
				userThisWeekendTasks={userThisWeekendTasks}
				userNextWeekTasks={userNextWeekTasks}
				userNextWeekendTasks={userNextWeekendTasks}
				userThisMonthTasks={userThisMonthTasks}
				userNextMonthTasks={userNextMonthTasks}
				expandedBlocks={expandedBlocks}
				setExpandedBlocks={setExpandedBlocks}
			/>

			<DisplayThisYearTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
				userOverdueTasks={userOverdueTasks}
				userTodayTasks={userTodayTasks}
				userTomorrowTasks={userTomorrowTasks}
				userThisWeekTasks={userThisWeekTasks}
				userThisWeekendTasks={userThisWeekendTasks}
				userNextWeekTasks={userNextWeekTasks}
				userNextWeekendTasks={userNextWeekendTasks}
				userThisMonthTasks={userThisMonthTasks}
				userNextMonthTasks={userNextMonthTasks}
				userThisYearTasks={userThisYearTasks}
				expandedBlocks={expandedBlocks}
				setExpandedBlocks={setExpandedBlocks}
			/>

			<DisplayNextYearTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
				userOverdueTasks={userOverdueTasks}
				userTodayTasks={userTodayTasks}
				userTomorrowTasks={userTomorrowTasks}
				userThisWeekTasks={userThisWeekTasks}
				userThisWeekendTasks={userThisWeekendTasks}
				userNextWeekTasks={userNextWeekTasks}
				userNextWeekendTasks={userNextWeekendTasks}
				userThisMonthTasks={userThisMonthTasks}
				userNextMonthTasks={userNextMonthTasks}
				userThisYearTasks={userThisYearTasks}
				userNextYearTasks={userNextYearTasks}
				expandedBlocks={expandedBlocks}
				setExpandedBlocks={setExpandedBlocks}
			/>

			<DisplayBecomingTasks
				setSelectedTask={setSelectedTask}
				openModal={openModal}
				userOverdueTasks={userOverdueTasks}
				userTodayTasks={userTodayTasks}
				userTomorrowTasks={userTomorrowTasks}
				userThisWeekTasks={userThisWeekTasks}
				userThisWeekendTasks={userThisWeekendTasks}
				userNextWeekTasks={userNextWeekTasks}
				userNextWeekendTasks={userNextWeekendTasks}
				userThisMonthTasks={userThisMonthTasks}
				userNextMonthTasks={userNextMonthTasks}
				userThisYearTasks={userThisYearTasks}
				userNextYearTasks={userNextYearTasks}
				userBecomingTasks={userBecomingTasks}
				expandedBlocks={expandedBlocks}
				setExpandedBlocks={setExpandedBlocks}
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

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { updateDisplayTasks } from '../../utils/updateDisplayTasks';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import HeaderBlock from '../TasksPage/HeaderBlock';

const DisplayNextMonthTasks = ({
	setSelectedTask,
	openModal,
	allTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const [displayNextMonthTasks, setDisplayNextMonthTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const updateExpandedBlocks = () => {
		if (
			allTasks.userOverdueTasks.length === 0 &&
			allTasks.userTodayTasks.length === 0 &&
			allTasks.userTomorrowTasks.length === 0 &&
			allTasks.userThisWeekTasks.length === 0 &&
			allTasks.userThisWeekendTasks.length === 0 &&
			allTasks.userNextWeekTasks.length === 0 &&
			allTasks.userNextWeekendTasks.length === 0 &&
			allTasks.userThisMonthTasks.length === 0
		) {
			setExpandedBlocks((prevState) => ({
				...prevState,
				'next-month-tasks': true,
			}));
		} else {
			setExpandedBlocks((prevState) => ({
				...prevState,
				'next-month-tasks': false,
			}));
		}
	};

	useEffect(() => {
		updateExpandedBlocks();
	}, [
		allTasks.userOverdueTasks,
		allTasks.userTodayTasks,
		allTasks.userTomorrowTasks,
		allTasks.userThisWeekTasks,
		allTasks.userThisWeekendTasks,
		allTasks.userNextWeekTasks,
		allTasks.userNextWeekendTasks,
		allTasks.userThisMonthTasks,
	]);

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayNextMonthTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				allTasks.userNextMonthTasks,
				workspaces,
				updatedTasks
			);
			setDisplayNextMonthTasks(updatedTasks);
		};

		updateDisplayNextMonthTasks();
	}, [allTasks.userNextMonthTasks]);

	return (
		<>
			{allTasks.userNextMonthTasks.length > 0 && (
				<div
					id="next-month-tasks"
					className={`mb-4 rounded-md bg-white ${
						expandedBlocks['next-month-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('next-month-tasks')}>
					<HeaderBlock
						label="Mois prochain"
						type={'next-month-tasks'}
						toggleBlock={toggleBlock}
					/>
					<div
						className="task-list"
						onClick={(e) => e.stopPropagation()}>
						{displayNextMonthTasks &&
						displayNextMonthTasks?.length > 0
							? displayNextMonthTasks
									.filter(
										(task) =>
											task.category === 'next-month-tasks'
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
			)}
		</>
	);
};

export default DisplayNextMonthTasks;

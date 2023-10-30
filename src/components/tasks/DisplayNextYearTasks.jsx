import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import HeaderBlock from './HeaderBlock';

const DisplayNextYearTasks = ({
	setSelectedTask,
	openModal,
	userOverdueTasks,
	userTodayTasks,
	userTomorrowTasks,
	userThisWeekTasks,
	userThisWeekendTasks,
	userNextWeekTasks,
	userNextWeekendTasks,
	userThisMonthTasks,
	userNextMonthTasks,
	userThisYearTasks,
	userNextYearTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const [displayNextYearTasks, setDisplayNextYearTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const updateExpandedBlocks = () => {
		if (
			userOverdueTasks.length === 0 &&
			userTodayTasks.length === 0 &&
			userTomorrowTasks.length === 0 &&
			userThisWeekTasks.length === 0 &&
			userThisWeekendTasks.length === 0 &&
			userNextWeekTasks.length === 0 &&
			userNextWeekendTasks.length === 0 &&
			userThisMonthTasks.length === 0 &&
			userNextMonthTasks.length === 0 &&
			userThisYearTasks.length === 0
		) {
			setExpandedBlocks((prevState) => ({
				...prevState,
				'next-year-tasks': true,
			}));
		} else {
			setExpandedBlocks((prevState) => ({
				...prevState,
				'next-year-tasks': false,
			}));
		}
	};

	useEffect(() => {
		updateExpandedBlocks();
	}, [
		userOverdueTasks,
		userTodayTasks,
		userTomorrowTasks,
		userThisWeekTasks,
		userThisWeekendTasks,
		userNextWeekTasks,
		userNextWeekendTasks,
		userThisMonthTasks,
		userNextMonthTasks,
		userThisYearTasks,
	]);

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayNextYearTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				userNextYearTasks,
				workspaces,
				updatedTasks
			);
			setDisplayNextYearTasks(updatedTasks);
		};

		updateDisplayNextYearTasks();
	}, [userNextYearTasks]);

	return (
		<>
			{userNextYearTasks.length > 0 && (
				<div
					id="next-year-tasks"
					className={`task-block ${
						expandedBlocks['next-year-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('next-year-tasks')}>
					<HeaderBlock
						label="Année prochaine"
						type={'next-year-tasks'}
						toggleBlock={toggleBlock}
					/>

					<div className="task-list">
						{displayNextYearTasks &&
						displayNextYearTasks?.length > 0
							? displayNextYearTasks
									.filter(
										(task) =>
											task.category === 'next-year-tasks'
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

export default DisplayNextYearTasks;

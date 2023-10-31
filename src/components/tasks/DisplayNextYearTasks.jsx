import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import HeaderBlock from './HeaderBlock';

const DisplayNextYearTasks = ({
	setSelectedTask,
	openModal,
	allTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const [displayNextYearTasks, setDisplayNextYearTasks] = useState([]);
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
			allTasks.userThisMonthTasks.length === 0 &&
			allTasks.userNextMonthTasks.length === 0 &&
			allTasks.userThisYearTasks.length === 0
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
		allTasks.userOverdueTasks,
		allTasks.userTodayTasks,
		allTasks.userTomorrowTasks,
		allTasks.userThisWeekTasks,
		allTasks.userThisWeekendTasks,
		allTasks.userNextWeekTasks,
		allTasks.userNextWeekendTasks,
		allTasks.userThisMonthTasks,
		allTasks.userNextMonthTasks,
		allTasks.userThisYearTasks,
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
				allTasks.userNextYearTasks,
				workspaces,
				updatedTasks
			);
			setDisplayNextYearTasks(updatedTasks);
		};

		updateDisplayNextYearTasks();
	}, [allTasks.userNextYearTasks]);

	return (
		<>
			{allTasks.userNextYearTasks.length > 0 && (
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

					<div
						className="task-list"
						onClick={(e) => e.stopPropagation()}>
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

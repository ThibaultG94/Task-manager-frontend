import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import HeaderBlock from './HeaderBlock';

const DisplayThisYearTasks = ({
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
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const [displayThisYearTasks, setDisplayThisYearTasks] = useState([]);
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
			userNextMonthTasks.length === 0
		) {
			setExpandedBlocks((prevState) => ({
				...prevState,
				'this-year-tasks': true,
			}));
		} else {
			setExpandedBlocks((prevState) => ({
				...prevState,
				'this-year-tasks': false,
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
	]);

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayThisYearTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				userThisYearTasks,
				workspaces,
				updatedTasks
			);
			setDisplayThisYearTasks(updatedTasks);
		};

		updateDisplayThisYearTasks();
	}, [userThisYearTasks]);

	return (
		<>
			{userThisYearTasks.length > 0 && (
				<div
					id="this-year-tasks"
					className={`task-block ${
						expandedBlocks['this-year-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('this-year-tasks')}>
					<HeaderBlock
						label={'Cette année'}
						type={'this-year-tasks'}
						toggleBlock={toggleBlock}
					/>

					<div className="task-list">
						{displayThisYearTasks &&
						displayThisYearTasks?.length > 0
							? displayThisYearTasks
									.filter(
										(task) =>
											task.category === 'this-year-tasks'
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

export default DisplayThisYearTasks;

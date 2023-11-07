import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import HeaderBlock from './HeaderBlock';

const DisplayThisYearTasks = ({
	setSelectedTask,
	openModal,
	allTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const [displayThisYearTasks, setDisplayThisYearTasks] = useState([]);
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
			allTasks.userNextMonthTasks.length === 0
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
		allTasks.userOverdueTasks,
		allTasks.userTodayTasks,
		allTasks.userTomorrowTasks,
		allTasks.userThisWeekTasks,
		allTasks.userThisWeekendTasks,
		allTasks.userNextWeekTasks,
		allTasks.userNextWeekendTasks,
		allTasks.userThisMonthTasks,
		allTasks.userNextMonthTasks,
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
				allTasks.userThisYearTasks,
				workspaces,
				updatedTasks
			);
			setDisplayThisYearTasks(updatedTasks);
		};

		updateDisplayThisYearTasks();
	}, [allTasks.userThisYearTasks]);

	return (
		<>
			{allTasks.userThisYearTasks.length > 0 && (
				<div
					id="this-year-tasks"
					className={`mx-8 my-3 rounded-md bg-white ${
						expandedBlocks['this-year-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('this-year-tasks')}>
					<HeaderBlock
						label={'Cette année'}
						type={'this-year-tasks'}
						toggleBlock={toggleBlock}
					/>

					<div
						className="task-list"
						onClick={(e) => e.stopPropagation()}>
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

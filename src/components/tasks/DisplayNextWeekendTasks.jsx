import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from '../TasksPage/TaskItem';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { updateDisplayTasks } from '../../utils/updateDisplayTasks';
import HeaderBlock from '../TasksPage/HeaderBlock';

const DisplayNextWeekendTasks = ({
	setSelectedTask,
	openModal,
	allTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const [displayNextWeekendTasks, setDisplayNextWeekendTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const updateExpandedBlocks = () => {
		if (
			allTasks.userOverdueTasks.length === 0 &&
			allTasks.userTodayTasks.length === 0 &&
			allTasks.userTomorrowTasks.length === 0 &&
			allTasks.userThisWeekTasks.length === 0 &&
			allTasks.userThisWeekendTasks.length === 0 &&
			allTasks.userNextWeekTasks.length === 0
		) {
			setExpandedBlocks((prevState) => ({
				...prevState,
				'next-weekend-tasks': true,
			}));
		} else {
			setExpandedBlocks((prevState) => ({
				...prevState,
				'next-weekend-tasks': false,
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
	]);

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayNextWeekendTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				allTasks.userNextWeekendTasks,
				workspaces,
				updatedTasks
			);
			setDisplayNextWeekendTasks(updatedTasks);
		};

		updateDisplayNextWeekendTasks();
	}, [allTasks.userNextWeekendTasks]);

	return (
		<>
			{allTasks.userNextWeekendTasks.length > 0 && (
				<div
					id="next-weekend-tasks"
					className={`mb-4 rounded-md bg-white ${
						expandedBlocks['next-weekend-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('next-weekend-tasks')}>
					<HeaderBlock
						label="Weekend prochain"
						type={'next-weekend-tasks'}
						toggleBlock={toggleBlock}
					/>

					<div
						className="task-list"
						onClick={(e) => e.stopPropagation()}>
						{displayNextWeekendTasks &&
						displayNextWeekendTasks?.length > 0
							? displayNextWeekendTasks
									.filter(
										(task) =>
											task.category ===
											'next-weekend-tasks'
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

export default DisplayNextWeekendTasks;

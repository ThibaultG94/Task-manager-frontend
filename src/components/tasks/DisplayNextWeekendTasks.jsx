import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import HeaderBlock from './HeaderBlock';

const DisplayNextWeekendTasks = ({
	setSelectedTask,
	openModal,
	userOverdueTasks,
	userTodayTasks,
	userTomorrowTasks,
	userThisWeekTasks,
	userThisWeekendTasks,
	userNextWeekTasks,
	userNextWeekendTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const [displayNextWeekendTasks, setDisplayNextWeekendTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const updateExpandedBlocks = () => {
		if (
			userOverdueTasks.length === 0 &&
			userTodayTasks.length === 0 &&
			userTomorrowTasks.length === 0 &&
			userThisWeekTasks.length === 0 &&
			userThisWeekendTasks.length === 0 &&
			userNextWeekTasks.length === 0
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
		userOverdueTasks,
		userTodayTasks,
		userTomorrowTasks,
		userThisWeekTasks,
		userThisWeekendTasks,
		userNextWeekTasks,
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
				userNextWeekendTasks,
				workspaces,
				updatedTasks
			);
			setDisplayNextWeekendTasks(updatedTasks);
		};

		updateDisplayNextWeekendTasks();
	}, [userNextWeekendTasks]);

	return (
		<>
			{userNextWeekendTasks.length > 0 && (
				<div
					id="next-weekend-tasks"
					className={`task-block ${
						expandedBlocks['next-weekend-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('next-weekend-tasks')}>
					<HeaderBlock
						label="Weekend prochain"
						type={'next-weekend-tasks'}
						toggleBlock={toggleBlock}
					/>

					<div className="task-list">
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

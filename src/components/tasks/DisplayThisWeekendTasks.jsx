import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import HeaderBlock from './HeaderBlock';

const DisplayThisWeekendTasks = ({
	setSelectedTask,
	openModal,
	userOverdueTasks,
	userTodayTasks,
	userTomorrowTasks,
	userThisWeekTasks,
	userThisWeekendTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const [displayThisWeekendTasks, setDisplayThisWeekendTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const updateExpandedBlocks = () => {
		if (
			userOverdueTasks.length === 0 &&
			userTodayTasks.length === 0 &&
			userTomorrowTasks.length === 0 &&
			userThisWeekTasks.length === 0 &&
			userThisWeekendTasks.length === 0
		) {
			setExpandedBlocks((prevState) => ({
				...prevState,
				'this-weekend-tasks': true,
			}));
		} else {
			setExpandedBlocks((prevState) => ({
				...prevState,
				'this-weekend-tasks': false,
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
	]);

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayThisWeekendTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				userThisWeekendTasks,
				workspaces,
				updatedTasks
			);
			setDisplayThisWeekendTasks(updatedTasks);
		};

		updateDisplayThisWeekendTasks();
	}, [userThisWeekendTasks]);

	return (
		<>
			{userThisWeekendTasks.length > 0 && (
				<div
					id="this-weekend-tasks"
					className={`task-block ${
						expandedBlocks['this-weekend-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('this-weekend-tasks')}>
					<HeaderBlock
						label="Ce weekend"
						type={'this-weekend-tasks'}
						toggleBlock={toggleBlock}
					/>

					<div className="task-list">
						{displayThisWeekendTasks &&
						displayThisWeekendTasks?.length > 0
							? displayThisWeekendTasks
									.filter(
										(task) =>
											task.category ===
											'this-weekend-tasks'
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

export default DisplayThisWeekendTasks;

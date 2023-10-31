import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import HeaderBlock from './HeaderBlock';

const DisplayThisWeekTasks = ({
	setSelectedTask,
	openModal,
	allTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const [displayThisWeekTasks, setDisplayThisWeekTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const updateExpandedBlocks = () => {
		if (
			allTasks.userOverdueTasks.length === 0 &&
			allTasks.userTodayTasks.length === 0 &&
			allTasks.userTomorrowTasks.length === 0
		) {
			setExpandedBlocks((prevState) => ({
				...prevState,
				'this-week-tasks': true,
			}));
		} else {
			setExpandedBlocks((prevState) => ({
				...prevState,
				'this-week-tasks': false,
			}));
		}
	};

	useEffect(() => {
		updateExpandedBlocks();
	}, [
		allTasks.userOverdueTasks,
		allTasks.userTodayTasks,
		allTasks.userTomorrowTasks,
	]);

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayThisWeekTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				allTasks.userThisWeekTasks,
				workspaces,
				updatedTasks
			);
			setDisplayThisWeekTasks(updatedTasks);
		};

		updateDisplayThisWeekTasks();
	}, [allTasks.userThisWeekTasks]);

	return (
		<>
			{allTasks.userThisWeekTasks.length > 0 && (
				<div
					id="this-week-tasks"
					className={`task-block ${
						expandedBlocks['this-week-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('this-week-tasks')}>
					<HeaderBlock
						label={'Cette semaine'}
						type={'this-week-tasks'}
						toggleBlock={toggleBlock}
					/>

					<div className="task-list">
						{displayThisWeekTasks &&
						displayThisWeekTasks?.length > 0
							? displayThisWeekTasks
									.filter(
										(task) =>
											task.category === 'this-week-tasks'
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

export default DisplayThisWeekTasks;

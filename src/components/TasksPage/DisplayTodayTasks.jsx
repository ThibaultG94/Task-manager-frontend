import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { selectIsTodayTasksLoaded } from '../../store/selectors/taskSelectors';
import { updateDisplayTasks } from '../../utils/updateDisplayTasks';
import HeaderBlock from './HeaderBlock';
import TaskItem from './TaskItem';
import LoadingTaskComponent from '../Buttons/LoadingTaskComponent';

const DisplayTodayTasks = ({
	setSelectedTask,
	openModal,
	allTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const workspaces = useSelector(selectWorkspaces);
	const isTodayTasksLoaded = useSelector(selectIsTodayTasksLoaded);

	const [displayTodayTasks, setDisplayTodayTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		if (!isTodayTasksLoaded) {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [isTodayTasksLoaded]);

	useEffect(() => {
		const updateDisplayTodayTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				allTasks.userTodayTasks,
				workspaces,
				updatedTasks
			);
			setDisplayTodayTasks(updatedTasks);
		};

		updateDisplayTodayTasks();
	}, [allTasks.userTodayTasks]);

	return (
		<>
			{allTasks.userTodayTasks.length > 0 && (
				<div
					id="today-tasks"
					className={`mb-4 rounded-md bg-white ${
						expandedBlocks['today-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('today-tasks')}>
					<HeaderBlock
						label={"Aujourd'hui"}
						type={'today-tasks'}
						toggleBlock={toggleBlock}
					/>

					{isLoading ? (
						<LoadingTaskComponent />
					) : (
						<div
						className="task-list"
						onClick={(e) => e.stopPropagation()}>
							{displayTodayTasks && displayTodayTasks?.length > 0
								? displayTodayTasks
								.filter(
									(task) =>
									task.category === 'today-tasks'
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
					)}
				</div>
			)}
		</>
	);
};

export default DisplayTodayTasks;

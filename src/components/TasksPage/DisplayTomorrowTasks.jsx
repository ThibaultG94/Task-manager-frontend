import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { selectIsTomorrowTasksLoaded } from '../../store/selectors/taskSelectors';
import { updateDisplayTasks } from '../../utils/updateDisplayTasks';
import HeaderBlock from './HeaderBlock';
import TaskItem from './TaskItem';
import LoadingTaskComponent from '../Buttons/LoadingTaskComponent';

const DisplayTomorrowTasks = ({
	setSelectedTask,
	openModal,
	allTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const workspaces = useSelector(selectWorkspaces);
	const isTomorrowTasksLoaded = useSelector(selectIsTomorrowTasksLoaded);

	const [displayTomorrowTasks, setDisplayTomorrowTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		if (!isTomorrowTasksLoaded) {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [isTomorrowTasksLoaded]);

	useEffect(() => {
		const updateDisplayTomorrowTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				allTasks.userTomorrowTasks,
				workspaces,
				updatedTasks
			);
			setDisplayTomorrowTasks(updatedTasks);
		};

		updateDisplayTomorrowTasks();
	}, [allTasks.userTomorrowTasks]);

	return (
		<>
			{allTasks.userTomorrowTasks.length > 0 && (
				<div
					id="tomorrow-tasks"
					className={`mb-4 rounded-md bg-white ${
						expandedBlocks['tomorrow-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('tomorrow-tasks')}>
					<HeaderBlock
						label={'Demain'}
						type={'tomorrow-tasks'}
						toggleBlock={toggleBlock}
					/>

					{isLoading ? (
						<LoadingTaskComponent />
					) : (
						<div
							className="task-list"
							onClick={(e) => e.stopPropagation()}>
							{displayTomorrowTasks &&
							displayTomorrowTasks?.length > 0
								? displayTomorrowTasks
										.filter(
											(task) =>
												task.category === 'tomorrow-tasks'
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

export default DisplayTomorrowTasks;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { selectIsNextWeekTasksLoaded } from '../../store/selectors/taskSelectors';
import { updateDisplayTasks } from '../../utils/updateDisplayTasks';
import HeaderBlock from './HeaderBlock';
import TaskItem from './TaskItem';
import LoadingTaskComponent from '../Buttons/LoadingTaskComponent';

const DisplayNextWeekTasks = ({
	setSelectedTask,
	openModal,
	allTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const workspaces = useSelector(selectWorkspaces);
	const isNextWeekTasksLoaded = useSelector(selectIsNextWeekTasksLoaded);

	const [displayNextWeekTasks, setDisplayNextWeekTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		if (!isNextWeekTasksLoaded) {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [isNextWeekTasksLoaded]);

	useEffect(() => {
		const updateDisplayNextWeekTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				allTasks.userNextWeekTasks,
				workspaces,
				updatedTasks
			);
			setDisplayNextWeekTasks(updatedTasks);
		};

		updateDisplayNextWeekTasks();
	}, [allTasks.userNextWeekTasks]);

	return (
		<>
			{allTasks.userNextWeekTasks.length > 0 && (
				<div
					id="next-week-tasks"
					className={`mb-4 rounded-md bg-white ${
						expandedBlocks['next-week-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('next-week-tasks')}>
					<HeaderBlock
						label="Semaine prochaine"
						type={'next-week-tasks'}
						toggleBlock={toggleBlock}
					/>

					{isLoading ? (
						<LoadingTaskComponent />
					) : (
						<div
							className="task-list"
							onClick={(e) => e.stopPropagation()}>
							{displayNextWeekTasks &&
							displayNextWeekTasks?.length > 0
								? displayNextWeekTasks
										.filter(
											(task) =>
												task.category === 'next-week-tasks'
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

export default DisplayNextWeekTasks;

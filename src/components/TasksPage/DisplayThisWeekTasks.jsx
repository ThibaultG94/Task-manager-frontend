import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { selectIsThisWeekTasksLoaded } from '../../store/selectors/taskSelectors';
import { updateDisplayTasks } from '../../utils/updateDisplayTasks';
import HeaderBlock from './HeaderBlock';
import TaskItem from './TaskItem';
import LoadingTaskComponent from '../Buttons/LoadingTaskComponent';

const DisplayThisWeekTasks = ({
	setSelectedTask,
	openModal,
	allTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const workspaces = useSelector(selectWorkspaces);
	const isThisWeekTasksLoaded = useSelector(selectIsThisWeekTasksLoaded);

	const [displayThisWeekTasks, setDisplayThisWeekTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		if (!isThisWeekTasksLoaded) {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [isThisWeekTasksLoaded]);

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
					className={`mb-4 rounded-md bg-white ${
						expandedBlocks['this-week-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('this-week-tasks')}>
					<HeaderBlock
						label={'Cette semaine'}
						type={'this-week-tasks'}
						toggleBlock={toggleBlock}
					/>

					{isLoading ? (
						<LoadingTaskComponent />
					) : (
						<div
							className="task-list"
							onClick={(e) => e.stopPropagation()}>
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
					)}
				</div>
			)}
		</>
	);
};

export default DisplayThisWeekTasks;

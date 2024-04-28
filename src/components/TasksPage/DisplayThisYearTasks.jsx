import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { selectIsThisYearTasksLoaded } from '../../store/selectors/taskSelectors';
import { updateDisplayTasks } from '../../utils/updateDisplayTasks';
import HeaderBlock from './HeaderBlock';
import TaskItem from './TaskItem';
import LoadingTaskComponent from '../Buttons/LoadingTaskComponent';

const DisplayThisYearTasks = ({
	setSelectedTask,
	openModal,
	allTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const workspaces = useSelector(selectWorkspaces);
	const isThisYearTasksLoaded = useSelector(selectIsThisYearTasksLoaded);
	
	const [displayThisYearTasks, setDisplayThisYearTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		isThisYearTasksLoaded ? setIsLoading(false) : setIsLoading(true);
	}, [isThisYearTasksLoaded]);

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
					className={`mb-4 rounded-md bg-white ${
						expandedBlocks['this-year-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('this-year-tasks')}>
					<HeaderBlock
						label={'Cette année'}
						type={'this-year-tasks'}
						toggleBlock={toggleBlock}
					/>

					{isLoading ? (
						<LoadingTaskComponent/>
					) : (
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
					)}
				</div>
			)}
		</>
	);
};

export default DisplayThisYearTasks;

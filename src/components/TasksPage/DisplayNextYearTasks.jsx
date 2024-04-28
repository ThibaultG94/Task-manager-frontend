import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { selectIsNextYearTasksLoaded } from '../../store/selectors/taskSelectors';
import { updateDisplayTasks } from '../../utils/updateDisplayTasks';
import HeaderBlock from './HeaderBlock';
import TaskItem from './TaskItem';
import LoadingTaskComponent from '../Buttons/LoadingTaskComponent';

const DisplayNextYearTasks = ({
	setSelectedTask,
	openModal,
	allTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const workspaces = useSelector(selectWorkspaces);
	const isNextYearTasksLoaded = useSelector(selectIsNextYearTasksLoaded);
	
	const [displayNextYearTasks, setDisplayNextYearTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		isNextYearTasksLoaded ? setIsLoading(false) : setIsLoading(true);
	}, [isNextYearTasksLoaded]);

	useEffect(() => {
		const updateDisplayNextYearTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				allTasks.userNextYearTasks,
				workspaces,
				updatedTasks
			);
			setDisplayNextYearTasks(updatedTasks);
		};

		updateDisplayNextYearTasks();
	}, [allTasks.userNextYearTasks]);

	return (
		<>
			{allTasks.userNextYearTasks.length > 0 && (
				<div
					id="next-year-tasks"
					className={`mb-4 rounded-md bg-white ${
						expandedBlocks['next-year-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('next-year-tasks')}>
					<HeaderBlock
						label="Année prochaine"
						type={'next-year-tasks'}
						toggleBlock={toggleBlock}
					/>

					{isLoading ? (
						<LoadingTaskComponent />
					) : (
						<div
							className="task-list"
							onClick={(e) => e.stopPropagation()}>
							{displayNextYearTasks &&
							displayNextYearTasks?.length > 0
								? displayNextYearTasks
										.filter(
											(task) =>
												task.category === 'next-year-tasks'
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

export default DisplayNextYearTasks;

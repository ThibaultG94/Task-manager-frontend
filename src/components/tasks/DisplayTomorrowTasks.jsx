import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import HeaderBlock from './HeaderBlock';

const DisplayTomorrowTasks = ({
	setSelectedTask,
	openModal,
	allTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const [displayTomorrowTasks, setDisplayTomorrowTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

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
					className={`task-block ${
						expandedBlocks['tomorrow-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('tomorrow-tasks')}>
					<HeaderBlock
						label={'Demain'}
						type={'tomorrow-tasks'}
						toggleBlock={toggleBlock}
					/>

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
				</div>
			)}
		</>
	);
};

export default DisplayTomorrowTasks;

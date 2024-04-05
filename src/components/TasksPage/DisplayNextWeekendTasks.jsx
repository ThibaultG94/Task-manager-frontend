import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { updateDisplayTasks } from '../../utils/updateDisplayTasks';
import HeaderBlock from './HeaderBlock';
import TaskItem from './TaskItem';

const DisplayNextWeekendTasks = ({
	setSelectedTask,
	openModal,
	allTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const [displayNextWeekendTasks, setDisplayNextWeekendTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

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
				allTasks.userNextWeekendTasks,
				workspaces,
				updatedTasks
			);
			setDisplayNextWeekendTasks(updatedTasks);
		};

		updateDisplayNextWeekendTasks();
	}, [allTasks.userNextWeekendTasks]);

	return (
		<>
			{allTasks.userNextWeekendTasks.length > 0 && (
				<div
					id="next-weekend-tasks"
					className={`mb-4 rounded-md bg-white ${
						expandedBlocks['next-weekend-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('next-weekend-tasks')}>
					<HeaderBlock
						label="Weekend prochain"
						type={'next-weekend-tasks'}
						toggleBlock={toggleBlock}
					/>

					<div
						className="task-list"
						onClick={(e) => e.stopPropagation()}>
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

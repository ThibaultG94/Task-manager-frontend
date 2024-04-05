import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { updateDisplayTasks } from '../../utils/updateDisplayTasks';
import HeaderBlock from './HeaderBlock';
import TaskItem from './TaskItem';

const DisplayThisWeekendTasks = ({
	setSelectedTask,
	openModal,
	allTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const [displayThisWeekendTasks, setDisplayThisWeekendTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

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
				allTasks.userThisWeekendTasks,
				workspaces,
				updatedTasks
			);
			setDisplayThisWeekendTasks(updatedTasks);
		};

		updateDisplayThisWeekendTasks();
	}, [allTasks.userThisWeekendTasks]);

	return (
		<>
			{allTasks.userThisWeekendTasks.length > 0 && (
				<div
					id="this-weekend-tasks"
					className={`mb-4 rounded-md bg-white ${
						expandedBlocks['this-weekend-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('this-weekend-tasks')}>
					<HeaderBlock
						label="Ce weekend"
						type={'this-weekend-tasks'}
						toggleBlock={toggleBlock}
					/>

					<div
						className="task-list"
						onClick={(e) => e.stopPropagation()}>
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

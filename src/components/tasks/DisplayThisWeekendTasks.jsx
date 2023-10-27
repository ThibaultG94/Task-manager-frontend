import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectThisWeekendTasks } from '../../store/selectors/taskSelectors';
import TaskItem from './TaskItem';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import HeaderBlock from './HeaderBlock';

const DisplayThisWeekendTasks = ({ setSelectedTask, openModal }) => {
	const userThisWeekendTasks = useSelector(selectThisWeekendTasks);
	const [displayThisWeekendTasks, setDisplayThisWeekendTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const [expandedBlocks, setExpandedBlocks] = useState({
		'this-weekend-tasks': false,
	});

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
				userThisWeekendTasks,
				workspaces,
				updatedTasks
			);
			setDisplayThisWeekendTasks(updatedTasks);
		};

		updateDisplayThisWeekendTasks();
	}, [userThisWeekendTasks]);

	return (
		<>
			{userThisWeekendTasks.length > 0 && (
				<div
					id="this-weekend-tasks"
					className={`task-block ${
						expandedBlocks['this-weekend-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('this-weekend-tasks')}>
					<HeaderBlock
						label="Ce Weekend"
						type={'this-weekend-tasks'}
						toggleBlock={toggleBlock}
					/>

					<div className="task-list">
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

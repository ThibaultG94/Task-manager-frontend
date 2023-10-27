import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectThisYearTasks } from '../../store/selectors/taskSelectors';
import TaskItem from './TaskItem';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import HeaderBlock from './HeaderBlock';

const DisplayThisYearTasks = ({ setSelectedTask, openModal }) => {
	const userThisYearTasks = useSelector(selectThisYearTasks);
	const [displayThisYearTasks, setDisplayThisYearTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const [expandedBlocks, setExpandedBlocks] = useState({
		'this-year-tasks': false,
	});

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayThisYearTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				userThisYearTasks,
				workspaces,
				updatedTasks
			);
			setDisplayThisYearTasks(updatedTasks);
		};

		updateDisplayThisYearTasks();
	}, [userThisYearTasks]);

	return (
		<>
			{userThisYearTasks.length > 0 && (
				<div
					id="this-year-tasks"
					className={`task-block ${
						expandedBlocks['this-year-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('this-year-tasks')}>
					<HeaderBlock
						label={'Cette année'}
						type={'this-year-tasks'}
						toggleBlock={toggleBlock}
					/>

					<div className="task-list">
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
				</div>
			)}
		</>
	);
};

export default DisplayThisYearTasks;

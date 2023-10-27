import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNextYearTasks } from '../../store/selectors/taskSelectors';
import TaskItem from './TaskItem';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import HeaderBlock from './HeaderBlock';

const DisplayNextYearTasks = ({ setSelectedTask, openModal }) => {
	const userNextYearTasks = useSelector(selectNextYearTasks);
	const [displayNextYearTasks, setDisplayNextYearTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const [expandedBlocks, setExpandedBlocks] = useState({
		'next-year-tasks': false,
	});

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayNextYearTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				userNextYearTasks,
				workspaces,
				updatedTasks
			);
			setDisplayNextYearTasks(updatedTasks);
		};

		updateDisplayNextYearTasks();
	}, [userNextYearTasks]);

	return (
		<>
			{userNextYearTasks.length > 0 && (
				<div
					id="next-year-tasks"
					className={`task-block ${
						expandedBlocks['next-year-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('next-year-tasks')}>
					<HeaderBlock
						label="Année prochaine"
						type={'next-year-tasks'}
						toggleBlock={toggleBlock}
					/>

					<div className="task-list">
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
				</div>
			)}
		</>
	);
};

export default DisplayNextYearTasks;

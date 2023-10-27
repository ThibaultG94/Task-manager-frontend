import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { selectTodayTasks } from '../../store/selectors/taskSelectors';
import HeaderBlock from './HeaderBlock';

const DisplayTodayTasks = ({ setSelectedTask, openModal }) => {
	const userTodayTasks = useSelector(selectTodayTasks);
	const [displayTodayTasks, setDisplayTodayTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const [expandedBlocks, setExpandedBlocks] = useState({
		'today-tasks': true,
	});

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayTodayTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(userTodayTasks, workspaces, updatedTasks);
			setDisplayTodayTasks(updatedTasks);
		};

		updateDisplayTodayTasks();
	}, [userTodayTasks]);

	return (
		<>
			{userTodayTasks.length > 0 && (
				<div
					id="today-tasks"
					className={`task-block ${
						expandedBlocks['today-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('today-tasks')}>
					<HeaderBlock
						label={"Aujourd'hui"}
						type={'today-tasks'}
						toggleBlock={toggleBlock}
					/>

					<div className="task-list">
						{displayTodayTasks && displayTodayTasks?.length > 0
							? displayTodayTasks
									.filter(
										(task) =>
											task.category === 'today-tasks'
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

export default DisplayTodayTasks;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNextMonthTasks } from '../../store/selectors/taskSelectors';
import TaskItem from './TaskItem';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import HeaderBlock from './HeaderBlock';

const DisplayNextMonthTasks = ({ setSelectedTask, openModal }) => {
	const userNextMonthTasks = useSelector(selectNextMonthTasks);
	const [displayNextMonthTasks, setDisplayNextMonthTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const [expandedBlocks, setExpandedBlocks] = useState({
		'next-month-tasks': false,
	});

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayNextMonthTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				userNextMonthTasks,
				workspaces,
				updatedTasks
			);
			setDisplayNextMonthTasks(updatedTasks);
		};

		updateDisplayNextMonthTasks();
	}, [userNextMonthTasks]);

	return (
		<>
			{userNextMonthTasks.length > 0 && (
				<div
					id="next-month-tasks"
					className={`task-block ${
						expandedBlocks['next-month-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('next-month-tasks')}>
					<HeaderBlock
						label="Mois prochain"
						type={'next-month-tasks'}
						toggleBlock={toggleBlock}
					/>
					<div className="task-list">
						{displayNextMonthTasks &&
						displayNextMonthTasks?.length > 0
							? displayNextMonthTasks
									.filter(
										(task) =>
											task.category === 'next-month-tasks'
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

export default DisplayNextMonthTasks;

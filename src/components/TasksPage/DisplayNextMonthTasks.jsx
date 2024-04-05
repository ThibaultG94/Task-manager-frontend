import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { updateDisplayTasks } from '../../utils/updateDisplayTasks';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import HeaderBlock from './HeaderBlock';
import TaskItem from './TaskItem';

const DisplayNextMonthTasks = ({
	setSelectedTask,
	openModal,
	allTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const [displayNextMonthTasks, setDisplayNextMonthTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

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
				allTasks.userNextMonthTasks,
				workspaces,
				updatedTasks
			);
			setDisplayNextMonthTasks(updatedTasks);
		};

		updateDisplayNextMonthTasks();
	}, [allTasks.userNextMonthTasks]);

	return (
		<>
			{allTasks.userNextMonthTasks.length > 0 && (
				<div
					id="next-month-tasks"
					className={`mb-4 rounded-md bg-white ${
						expandedBlocks['next-month-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('next-month-tasks')}>
					<HeaderBlock
						label="Mois prochain"
						type={'next-month-tasks'}
						toggleBlock={toggleBlock}
					/>
					<div
						className="task-list"
						onClick={(e) => e.stopPropagation()}>
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

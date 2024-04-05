import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { updateDisplayTasks } from '../../utils/updateDisplayTasks';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import HeaderBlock from './HeaderBlock';
import TaskItem from './TaskItem';

const DisplayNextYearTasks = ({
	setSelectedTask,
	openModal,
	allTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const [displayNextYearTasks, setDisplayNextYearTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

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
				</div>
			)}
		</>
	);
};

export default DisplayNextYearTasks;

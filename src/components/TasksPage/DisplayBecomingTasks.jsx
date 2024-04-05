import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { updateDisplayTasks } from '../../utils/updateDisplayTasks';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import HeaderBlock from './HeaderBlock';
import TaskItem from './TaskItem';

const DisplayBecomingTasks = ({
	setSelectedTask,
	openModal,
	allTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const [displayBecomingTasks, setDisplayBecomingTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayBecomingTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				allTasks.userBecomingTasks,
				workspaces,
				updatedTasks
			);
			setDisplayBecomingTasks(updatedTasks);
		};

		updateDisplayBecomingTasks();
	}, [allTasks.userBecomingTasks]);

	return (
		<>
			{allTasks.userBecomingTasks.length > 0 && (
				<div
					id="becoming-tasks"
					className={`mb-4 rounded-md bg-white ${
						expandedBlocks['becoming-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('becoming-tasks')}>
					<HeaderBlock
						label={'Prochaines années'}
						type={'becoming-tasks'}
						toggleBlock={toggleBlock}
					/>

					<div
						className="task-list"
						onClick={(e) => e.stopPropagation()}>
						{displayBecomingTasks &&
						displayBecomingTasks?.length > 0
							? displayBecomingTasks
									.filter(
										(task) =>
											task.category === 'becoming-tasks'
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

export default DisplayBecomingTasks;

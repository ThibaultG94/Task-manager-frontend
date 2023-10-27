import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBecomingTasks } from '../../store/selectors/taskSelectors';
import TaskItem from './TaskItem';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import HeaderBlock from './HeaderBlock';

const DisplayBecomingTasks = ({ setSelectedTask, openModal }) => {
	const userBecomingTasks = useSelector(selectBecomingTasks);
	const [displayBecomingTasks, setDisplayBecomingTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const [expandedBlocks, setExpandedBlocks] = useState({
		'becoming-tasks': false,
	});

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
				userBecomingTasks,
				workspaces,
				updatedTasks
			);
			setDisplayBecomingTasks(updatedTasks);
		};

		updateDisplayBecomingTasks();
	}, [userBecomingTasks]);

	return (
		<>
			{userBecomingTasks.length > 0 && (
				<div
					id="becoming-tasks"
					className={`task-block ${
						expandedBlocks['becoming-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('becoming-tasks')}>
					<HeaderBlock
						label={'Prochaines années'}
						type={'becoming-tasks'}
						toggleBlock={toggleBlock}
					/>

					<div className="task-list">
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

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectThisMonthTasks } from '../../store/selectors/taskSelectors';
import TaskItem from './TaskItem';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import HeaderBlock from './HeaderBlock';

const DisplayThisMonthTasks = ({ setSelectedTask, openModal }) => {
	const userThisMonthTasks = useSelector(selectThisMonthTasks);
	const [displayThisMonthTasks, setDisplayThisMonthTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const [expandedBlocks, setExpandedBlocks] = useState({
		'this-month-tasks': false,
	});

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayThisMonthTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				userThisMonthTasks,
				workspaces,
				updatedTasks
			);
			setDisplayThisMonthTasks(updatedTasks);
		};

		updateDisplayThisMonthTasks();
	}, [userThisMonthTasks]);

	return (
		<>
			{userThisMonthTasks.length > 0 && (
				<div
					id="this-month-tasks"
					className={`task-block ${
						expandedBlocks['this-month-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('this-month-tasks')}>
					<HeaderBlock
						label={'Ce mois-ci'}
						type={'this-month-tasks'}
						toggleBlock={toggleBlock}
					/>

					<div className="task-list">
						{displayThisMonthTasks &&
						displayThisMonthTasks?.length > 0
							? displayThisMonthTasks
									.filter(
										(task) =>
											task.category === 'this-month-tasks'
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

export default DisplayThisMonthTasks;

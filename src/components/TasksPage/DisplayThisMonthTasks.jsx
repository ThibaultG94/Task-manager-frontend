import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { updateDisplayTasks } from '../../utils/updateDisplayTasks';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import HeaderBlock from './HeaderBlock';
import TaskItem from './TaskItem';

const DisplayThisMonthTasks = ({
	setSelectedTask,
	openModal,
	allTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const [displayThisMonthTasks, setDisplayThisMonthTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

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
				allTasks.userThisMonthTasks,
				workspaces,
				updatedTasks
			);
			setDisplayThisMonthTasks(updatedTasks);
		};

		updateDisplayThisMonthTasks();
	}, [allTasks.userThisMonthTasks]);

	return (
		<>
			{allTasks.userThisMonthTasks.length > 0 && (
				<div
					id="this-month-tasks"
					className={`mb-4 rounded-md bg-white ${
						expandedBlocks['this-month-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('this-month-tasks')}>
					<HeaderBlock
						label={'Ce mois-ci'}
						type={'this-month-tasks'}
						toggleBlock={toggleBlock}
					/>

					<div
						className="task-list"
						onClick={(e) => e.stopPropagation()}>
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

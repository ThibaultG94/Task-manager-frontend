import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import HeaderBlock from './HeaderBlock';

const DisplayThisWeekTasks = ({
	setSelectedTask,
	openModal,
	userOverdueTasks,
	userTodayTasks,
	userTomorrowTasks,
	userThisWeekTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const [displayThisWeekTasks, setDisplayThisWeekTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const updateExpandedBlocks = () => {
		if (
			userOverdueTasks.length === 0 &&
			userTodayTasks.length === 0 &&
			userTomorrowTasks.length === 0
		) {
			setExpandedBlocks((prevState) => ({
				...prevState,
				'this-week-tasks': true,
			}));
		} else {
			setExpandedBlocks((prevState) => ({
				...prevState,
				'this-week-tasks': false,
			}));
		}
	};

	useEffect(() => {
		updateExpandedBlocks();
	}, [userOverdueTasks, userTodayTasks, userTomorrowTasks]);

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayThisWeekTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				userThisWeekTasks,
				workspaces,
				updatedTasks
			);
			setDisplayThisWeekTasks(updatedTasks);
		};

		updateDisplayThisWeekTasks();
	}, [userThisWeekTasks]);

	return (
		<>
			{userThisWeekTasks.length > 0 && (
				<div
					id="this-week-tasks"
					className={`task-block ${
						expandedBlocks['this-week-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('this-week-tasks')}>
					<HeaderBlock
						label={'Cette semaine'}
						type={'this-week-tasks'}
						toggleBlock={toggleBlock}
					/>

					<div className="task-list">
						{displayThisWeekTasks &&
						displayThisWeekTasks?.length > 0
							? displayThisWeekTasks
									.filter(
										(task) =>
											task.category === 'this-week-tasks'
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

export default DisplayThisWeekTasks;

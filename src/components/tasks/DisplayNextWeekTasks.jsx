import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import HeaderBlock from './HeaderBlock';

const DisplayNextWeekTasks = ({
	setSelectedTask,
	openModal,
	allTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const [displayNextWeekTasks, setDisplayNextWeekTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const updateExpandedBlocks = () => {
		if (
			allTasks.userOverdueTasks.length === 0 &&
			allTasks.userTodayTasks.length === 0 &&
			allTasks.userTomorrowTasks.length === 0 &&
			allTasks.userThisWeekTasks.length === 0 &&
			allTasks.userThisWeekendTasks.length === 0
		) {
			setExpandedBlocks((prevState) => ({
				...prevState,
				'next-week-tasks': true,
			}));
		} else {
			setExpandedBlocks((prevState) => ({
				...prevState,
				'next-week-tasks': false,
			}));
		}
	};

	useEffect(() => {
		updateExpandedBlocks();
	}, [
		allTasks.userOverdueTasks,
		allTasks.userTodayTasks,
		allTasks.userTomorrowTasks,
		allTasks.userThisWeekTasks,
		allTasks.userThisWeekendTasks,
	]);

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayNextWeekTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				allTasks.userNextWeekTasks,
				workspaces,
				updatedTasks
			);
			setDisplayNextWeekTasks(updatedTasks);
		};

		updateDisplayNextWeekTasks();
	}, [allTasks.userNextWeekTasks]);

	return (
		<>
			{allTasks.userNextWeekTasks.length > 0 && (
				<div
					id="next-week-tasks"
					className={`task-block ${
						expandedBlocks['next-week-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('next-week-tasks')}>
					<HeaderBlock
						label="Semaine prochaine"
						type={'next-week-tasks'}
						toggleBlock={toggleBlock}
					/>

					<div className="task-list">
						{displayNextWeekTasks &&
						displayNextWeekTasks?.length > 0
							? displayNextWeekTasks
									.filter(
										(task) =>
											task.category === 'next-week-tasks'
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

export default DisplayNextWeekTasks;

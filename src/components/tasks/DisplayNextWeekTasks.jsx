import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import HeaderBlock from './HeaderBlock';

const DisplayNextWeekTasks = ({
	setSelectedTask,
	openModal,
	userOverdueTasks,
	userTodayTasks,
	userTomorrowTasks,
	userThisWeekTasks,
	userThisWeekendTasks,
	userNextWeekTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const [displayNextWeekTasks, setDisplayNextWeekTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const updateExpandedBlocks = () => {
		if (
			userOverdueTasks.length === 0 &&
			userTodayTasks.length === 0 &&
			userTomorrowTasks.length === 0 &&
			userThisWeekTasks.length === 0 &&
			userThisWeekendTasks.length === 0
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
		userOverdueTasks,
		userTodayTasks,
		userTomorrowTasks,
		userThisWeekTasks,
		userThisWeekendTasks,
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
				userNextWeekTasks,
				workspaces,
				updatedTasks
			);
			setDisplayNextWeekTasks(updatedTasks);
		};

		updateDisplayNextWeekTasks();
	}, [userNextWeekTasks]);

	return (
		<>
			{userNextWeekTasks.length > 0 && (
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

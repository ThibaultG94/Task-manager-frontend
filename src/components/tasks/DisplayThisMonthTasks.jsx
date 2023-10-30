import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import HeaderBlock from './HeaderBlock';

const DisplayThisMonthTasks = ({
	setSelectedTask,
	openModal,
	userOverdueTasks,
	userTodayTasks,
	userTomorrowTasks,
	userThisWeekTasks,
	userThisWeekendTasks,
	userNextWeekTasks,
	userNextWeekendTasks,
	userThisMonthTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const [displayThisMonthTasks, setDisplayThisMonthTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const updateExpandedBlocks = () => {
		if (
			userOverdueTasks.length === 0 &&
			userTodayTasks.length === 0 &&
			userTomorrowTasks.length === 0 &&
			userThisWeekTasks.length === 0 &&
			userThisWeekendTasks.length === 0 &&
			userNextWeekTasks.length === 0 &&
			userNextWeekendTasks.length === 0
		) {
			setExpandedBlocks((prevState) => ({
				...prevState,
				'this-month-tasks': true,
			}));
		} else {
			setExpandedBlocks((prevState) => ({
				...prevState,
				'this-month-tasks': false,
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
		userNextWeekTasks,
		userNextWeekendTasks,
	]);

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

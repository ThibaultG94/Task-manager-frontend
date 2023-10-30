import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import HeaderBlock from './HeaderBlock';

const DisplayBecomingTasks = ({
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
	userNextMonthTasks,
	userThisYearTasks,
	userNextYearTasks,
	userBecomingTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const [displayBecomingTasks, setDisplayBecomingTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const updateExpandedBlocks = () => {
		if (
			userOverdueTasks.length === 0 &&
			userTodayTasks.length === 0 &&
			userTomorrowTasks.length === 0 &&
			userThisWeekTasks.length === 0 &&
			userThisWeekendTasks.length === 0 &&
			userNextWeekTasks.length === 0 &&
			userNextWeekendTasks.length === 0 &&
			userThisMonthTasks.length === 0 &&
			userNextMonthTasks.length === 0 &&
			userThisYearTasks.length === 0 &&
			userNextYearTasks.length === 0
		) {
			setExpandedBlocks((prevState) => ({
				...prevState,
				'becoming-tasks': true,
			}));
		} else {
			setExpandedBlocks((prevState) => ({
				...prevState,
				'becoming-tasks': false,
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
		userThisMonthTasks,
		userNextMonthTasks,
		userThisYearTasks,
		userNextYearTasks,
	]);

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

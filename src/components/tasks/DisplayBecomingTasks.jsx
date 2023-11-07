import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import HeaderBlock from './HeaderBlock';

const DisplayBecomingTasks = ({
	setSelectedTask,
	openModal,
	allTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const [displayBecomingTasks, setDisplayBecomingTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const updateExpandedBlocks = () => {
		if (
			allTasks.userOverdueTasks.length === 0 &&
			allTasks.userTodayTasks.length === 0 &&
			allTasks.userTomorrowTasks.length === 0 &&
			allTasks.userThisWeekTasks.length === 0 &&
			allTasks.userThisWeekendTasks.length === 0 &&
			allTasks.userNextWeekTasks.length === 0 &&
			allTasks.userNextWeekendTasks.length === 0 &&
			allTasks.userThisMonthTasks.length === 0 &&
			allTasks.userNextMonthTasks.length === 0 &&
			allTasks.userThisYearTasks.length === 0 &&
			allTasks.userNextYearTasks.length === 0
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
		allTasks.userOverdueTasks,
		allTasks.userTodayTasks,
		allTasks.userTomorrowTasks,
		allTasks.userThisWeekTasks,
		allTasks.userThisWeekendTasks,
		allTasks.userNextWeekTasks,
		allTasks.userNextWeekendTasks,
		allTasks.userThisMonthTasks,
		allTasks.userNextMonthTasks,
		allTasks.userThisYearTasks,
		allTasks.userNextYearTasks,
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
					className={`mx-8 my-3 rounded-md bg-white ${
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

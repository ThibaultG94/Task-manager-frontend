import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectMidTermTasks } from '../../store/selectors/taskSelectors';
import { formatDateForDisplay } from '../utils/formatDateForDisplay';
import { getCategoryDay } from '../utils/getCategoryDay';
import { convertStatus } from '../utils/convertStatus';
import { convertPriority } from '../utils/convertPriority';

const DisplayMidTermTasks = ({ setSelectedTask, openModal }) => {
	const userMidTermTasks = useSelector(selectMidTermTasks);
	const [displayMidTermTasks, setDisplayMidTermTasks] = useState([]);

	const [expandedBlocks, setExpandedBlocks] = useState({
		'this-week-tasks': false,
		'this-weekend-tasks': false,
		'next-week-tasks': false,
		'next-weekend-tasks': false,
	});

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayMidTermTasks = async () => {
			const updatedTasks = [];
			for (let i = 0; i < userMidTermTasks.length; i++) {
				if (userMidTermTasks && userMidTermTasks[i]) {
					const formattedDate = await formatDateForDisplay(
						userMidTermTasks[i].deadline
					);
					const day = await formatDateForDisplay(
						userMidTermTasks[i].deadline
					);
					const category = await getCategoryDay(
						day,
						userMidTermTasks[i].status,
						userMidTermTasks[i].deadline
					);
					const convertedStatus = await convertStatus(
						userMidTermTasks[i].status
					);
					const convertedPriority = await convertPriority(
						userMidTermTasks[i].priority
					);
					updatedTasks.push({
						title: userMidTermTasks[i].title,
						date: formattedDate,
						status: userMidTermTasks[i].status,
						convertedStatus: convertedStatus,
						priority: userMidTermTasks[i].priority,
						convertedPriority: convertedPriority,
						deadline: userMidTermTasks[i].deadline,
						description: userMidTermTasks[i].description,
						comments: userMidTermTasks[i].comments,
						workspace: userMidTermTasks[i].workspaceId,
						assignedTo: userMidTermTasks[i].assignedTo,
						taskId: userMidTermTasks[i]._id,
						category: category,
						day: day,
					});
				}
			}
			setDisplayMidTermTasks(updatedTasks);
		};

		updateDisplayMidTermTasks();
	}, [userMidTermTasks]);

	return (
		<>
			{displayMidTermTasks.filter(
				(task) => task.category === 'this-week-tasks'
			).length > 0 && (
				<div
					id="this-week-tasks"
					className="task-block"
					onClick={(e) => openModal(e)}>
					<div className="task-block-header">
						<h3>Cette semaine</h3>
						<button className="toggle-button">▶</button>
					</div>
					<div className="task-list"></div>
				</div>
			)}

			{displayMidTermTasks.filter(
				(task) => task.category === 'this-weekend-tasks'
			).length > 0 && (
				<div
					id="this-weekend-tasks"
					className="task-block"
					onClick={(e) => openModal(e)}>
					<div className="task-block-header">
						<h3>Ce Weekend</h3>
						<button className="toggle-button">▶</button>
					</div>
					<div className="task-list"></div>
				</div>
			)}

			{displayMidTermTasks.filter(
				(task) => task.category === 'next-week-tasks'
			).length > 0 && (
				<div
					id="next-week-tasks"
					className="task-block"
					onClick={(e) => openModal(e)}>
					<div className="task-block-header">
						<h3>Semaine prochaine</h3>
						<button className="toggle-button">▶</button>
					</div>
					<div className="task-list"></div>
				</div>
			)}

			{displayMidTermTasks.filter(
				(task) => task.category === 'next-weekend-tasks'
			).length > 0 && (
				<div
					id="next-weekend-tasks"
					className="task-block"
					onClick={(e) => openModal(e)}>
					<div className="task-block-header">
						<h3>Weekend prochain</h3>
						<button className="toggle-button">▶</button>
					</div>
					<div className="task-list"></div>
				</div>
			)}
		</>
	);
};

export default DisplayMidTermTasks;

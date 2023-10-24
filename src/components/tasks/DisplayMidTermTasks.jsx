import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectMidTermTasks } from '../../store/selectors/taskSelectors';
import TaskItem from './TaskItem';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { sortTasks } from '../utils/sortTasks';

const DisplayMidTermTasks = ({ setSelectedTask, openModal }) => {
	const userMidTermTasks = useSelector(selectMidTermTasks);
	const [displayMidTermTasks, setDisplayMidTermTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const [expandedBlocks, setExpandedBlocks] = useState({
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
			await updateDisplayTasks(
				userMidTermTasks,
				workspaces,
				updatedTasks
			);
			const sortedTasks = await sortTasks(updatedTasks);
			setDisplayMidTermTasks(sortedTasks);
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
					className={`task-block ${
						expandedBlocks['this-week-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('this-week-tasks')}>
					<div className="task-block-header">
						<h3>Cette semaine</h3>
						<button
							className="toggle-button"
							onClick={(e) => {
								e.stopPropagation();
								toggleBlock('this-week-tasks');
							}}>
							▶
						</button>
					</div>
					<div className="task-list">
						{displayMidTermTasks && displayMidTermTasks?.length > 0
							? displayMidTermTasks
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

			{displayMidTermTasks.filter(
				(task) => task.category === 'this-weekend-tasks'
			).length > 0 && (
				<div
					id="this-weekend-tasks"
					className={`task-block ${
						expandedBlocks['this-weekend-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('this-weekend-tasks')}>
					<div className="task-block-header">
						<h3>Ce Weekend</h3>
						<button
							className="toggle-button"
							onClick={(e) => {
								e.stopPropagation();
								toggleBlock('this-weekend-tasks');
							}}>
							▶
						</button>
					</div>
					<div className="task-list">
						{displayMidTermTasks && displayMidTermTasks?.length > 0
							? displayMidTermTasks
									.filter(
										(task) =>
											task.category ===
											'this-weekend-tasks'
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

			{displayMidTermTasks.filter(
				(task) => task.category === 'next-week-tasks'
			).length > 0 && (
				<div
					id="next-week-tasks"
					className={`task-block ${
						expandedBlocks['next-week-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('next-week-tasks')}>
					<div className="task-block-header">
						<h3>Semaine prochaine</h3>
						<button
							className="toggle-button"
							onClick={(e) => {
								e.stopPropagation();
								toggleBlock('next-week-tasks');
							}}>
							▶
						</button>
					</div>
					<div className="task-list">
						{displayMidTermTasks && displayMidTermTasks?.length > 0
							? displayMidTermTasks
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

			{displayMidTermTasks.filter(
				(task) => task.category === 'next-weekend-tasks'
			).length > 0 && (
				<div
					id="next-weekend-tasks"
					className={`task-block ${
						expandedBlocks['next-weekend-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('next-weekend-tasks')}>
					<div className="task-block-header">
						<h3>Weekend prochain</h3>
						<button
							className="toggle-button"
							onClick={(e) => {
								e.stopPropagation();
								toggleBlock('next-weekend-tasks');
							}}>
							▶
						</button>
					</div>
					<div className="task-list">
						{displayMidTermTasks && displayMidTermTasks?.length > 0
							? displayMidTermTasks
									.filter(
										(task) =>
											task.category ===
											'next-weekend-tasks'
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

export default DisplayMidTermTasks;

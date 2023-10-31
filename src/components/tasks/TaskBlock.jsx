import HeaderBlock from './HeaderBlock';
import TaskItem from './TaskItem';

const TaskBlock = ({
	blockLabel,
	blockType,
	userTasks,
	setSelectedTask,
	openModal,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	return (
		<div
			id={blockType}
			className={`task-block ${
				expandedBlocks[blockType] ? 'expanded' : ''
			}`}
			onClick={() => toggleBlock(blockType)}>
			<HeaderBlock
				label={blockLabel}
				type={blockType}
				toggleBlock={toggleBlock}
			/>
			<div className="task-list">
				{userTasks && userTasks.length > 0
					? userTasks.map((task, index) => (
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
	);
};

export default TaskBlock;

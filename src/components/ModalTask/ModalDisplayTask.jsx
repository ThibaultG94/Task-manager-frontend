import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import { useGetWorkspace } from '../../api/workspaces/useGetWorkspace';
import { convertStatus, convertPriority } from '../../utils/convertTools';
import { frenchFormattedDate } from '../../utils/dateFormatTools';

const ModalDisplayTask = () => {
	const editedTask = useSelector(selectEditedTask);
	
	const [convertedStatus, setConvertedStatus] = useState('');
	const [convertedPriority, setConvertedPriority] = useState('');
	const [convertedDeadline, setConvertedDeadline] = useState('');
	const [convertedWorkspace, setConvertedWorkspace] = useState('');
	const [convertedMember, setConvertedMember] = useState('');

	const getWorkspace = useGetWorkspace();

	useEffect(() => {
		const fetchConvertedStatus = async () => {
			const status = await convertStatus(editedTask?.status);
			setConvertedStatus(status);
		};
		const fetchConvertedPriority = async () => {
			const priority = await convertPriority(editedTask?.priority);
			setConvertedPriority(priority);
		};
		const fetchConvertedDeadline = async () => {
			const deadline = await frenchFormattedDate(editedTask?.deadline);
			setConvertedDeadline(deadline);
		};
		const fetchConvertedWorkspace = async () => {
			const workspace = await getWorkspace(editedTask?.workspaceId);
			setConvertedWorkspace(workspace?.title);
		};
		const fetchConvertedMember = () => {
			setConvertedMember(editedTask?.assignedTo[0].username);
		};

		fetchConvertedStatus();
		fetchConvertedPriority();
		fetchConvertedDeadline();
		if (editedTask && editedTask?.workspaceId) fetchConvertedWorkspace();
		if (editedTask?.assignedTo) {
			console.log('editedTask?.assignedTo', editedTask?.assignedTo);
			fetchConvertedMember();
		}
	}, [editedTask]);

	return (
		<div className="max-w-lg mx-auto px-6 rounded-lg">
			<div className="text-center pt-4 px-6">
				<h5 className="text-gray-900 text-lg md:text-xl leading-tight font-medium mb-2">
					{editedTask?.title}
				</h5>
			</div>

			<div className="mb-4 text-base text-gray-700 px-2">
				<div className="flex justify-between items-center">
					<span className="text-sm font-bold self-end text-gray-500">
						Status
					</span>
					<div
						className={
							'status-icon mt-2 px-2 py-1 rounded-lg ' +
							convertedStatus
						}>
						<span
							className={`text-sm font-semibold px-2 rounded ${convertedStatus}`}>
							{convertedStatus}
						</span>
					</div>
				</div>

				<div className="flex justify-between items-center py-1">
					<span className="text-sm font-bold self-end text-gray-500">
						Assigné à
					</span>
					<div className="assigned-icon mt-2 ml-6 px-2 py-1 rounded-lg bg-light-blue-3">
						<span className="ml-2 text-sm">{convertedMember} </span>
					</div>
				</div>

				<div className="flex justify-between items-center py-1">
					<span className="text-sm font-bold self-end text-gray-500">
						Deadline
					</span>
					<div
						className={
							'deadline-icon mt-2 ml-6 px-2 py-1 rounded-lg ' +
							editedTask?.category
						}>
						<span className="ml-2 text-sm">
							{convertedDeadline}
						</span>
					</div>
				</div>

				<div className="flex justify-between items-center py-1">
					<span className="text-sm font-bold self-end text-gray-500">
						Priorité
					</span>
					<div
						className={
							'priority-icon mt-2 ml-6 px-2 py-1 rounded-lg ' +
							convertedPriority
						}>
						<span className="ml-2 text-sm">
							{convertedPriority}
						</span>
					</div>
				</div>

				<div className="flex justify-between items-center py-1">
					<span className="text-sm font-bold self-end text-gray-500">
						Workspace
					</span>
					<div className="workspace-icon mt-2 px-2 py-1 rounded-lg bg-light-blue">
						<span className="ml-2 text-sm">
							{convertedWorkspace}{' '}
						</span>
					</div>
				</div>
			</div>

			{editedTask?.description ? (
				<div className="mt-4 px-2">
					<div className="bg-gray-100 description-icon p-3 rounded-lg">
						<span className="ml-2 text-gray-600 whitespace-pre-line">
							{editedTask?.description}
						</span>
					</div>
				</div>
			) : null}
		
			{editedTask?.comments ? (
				<div className="flex flex-wrap mb-2">
				<div className="comments-icon mt-2 ml-6 px-2 py-1 rounded-lg">
					<span className="ml-2 text-lg">{editedTask?.comments}</span>
				</div>
			</div>
			) : null}
		</div>
	);
};

export default ModalDisplayTask;

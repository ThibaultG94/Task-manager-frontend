import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import TaskDisplayComments from './TaskDisplayComments';
import { convertStatus } from '../utils/convertStatus';
import { convertPriority } from '../utils/convertPriority';
import { frenchFormattedDate } from '../utils/frenchFormattedDate';
import { useGetWorkspace } from '../../api/getWorkspace';
import { useGetUser } from '../../api/getUser';

const ModalDisplayTask = () => {
	const editedTask = useSelector(selectEditedTask);
	const [convertedStatus, setConvertedStatus] = useState('');
	const [convertedPriority, setConvertedPriority] = useState('');
	const [convertedDeadline, setConvertedDeadline] = useState('');
	const [convertedWorkspace, setConvertedWorkspace] = useState('');
	const [convertedMember, setConvertedMember] = useState('');

	const getWorkspace = useGetWorkspace();
	const getUser = useGetUser();

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
		const fetchConvertedMember = async () => {
			const user = await getUser(editedTask?.assignedTo);
			setConvertedMember(user?.username);
		};

		fetchConvertedStatus();
		fetchConvertedPriority();
		fetchConvertedDeadline();
		if (editedTask && editedTask?.workspaceId) fetchConvertedWorkspace();
		if (editedTask?.assignedTo) fetchConvertedMember();
	}, [editedTask]);

	return (
		<div className="py-3">
			<div className="mb-6">
				<div className="text-center">
					<p className="mt-3 text-2xl font-normal flex-grow">
						{editedTask?.title}
					</p>
				</div>
			</div>

			<div className="flex mt-3 mb-2">
				<div className="flex flex-wrap mb-2">
					<div
						className={
							'status-icon mt-2 px-2 py-1 rounded-lg ' +
							convertedStatus
						}>
						<span className="ml-2 text-lg">{convertedStatus}</span>
					</div>
				</div>

				<div className="flex flex-wrap mb-2">
					<div
						className={
							'priority-icon mt-2 ml-6 px-2 py-1 rounded-lg ' +
							convertedPriority
						}>
						<span className="ml-2 text-lg">
							{convertedPriority}
						</span>
					</div>
				</div>

				<div className="flex flex-wrap mb-2">
					<div
						className={
							'deadline-icon mt-2 ml-6 px-2 py-1 rounded-lg ' +
							editedTask?.category
						}>
						<span className="ml-2 text-lg">
							{convertedDeadline}
						</span>
					</div>
				</div>
			</div>

			<div className="flex flex-wrap mb-2">
				<div className="description-icon px-2 py-1 rounded-lg">
					<span className="ml-2 text-lg">
						{editedTask?.description}
					</span>
				</div>
			</div>

			<div className="flex">
				<div className="flex flex-wrap mb-2">
					<div className="workspace-icon mt-2 px-2 py-1 rounded-lg bg-light-blue">
						<span className="ml-2 text-lg">
							{convertedWorkspace}
						</span>
					</div>
				</div>{' '}
				<div className="flex flex-wrap mb-2">
					<div className="assigned-icon mt-2 ml-6 px-2 py-1 rounded-lg bg-light-blue-3">
						<span className="ml-2 text-lg">{convertedMember}</span>
					</div>
				</div>
			</div>
			{/* <TaskDisplayComments /> */}
		</div>
	);
};

export default ModalDisplayTask;

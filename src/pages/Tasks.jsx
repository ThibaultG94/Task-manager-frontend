import React, { useEffect, useState } from 'react';
import SideBar from '../components/sidebar/SideBar';
import Header from '../components/header/Header';
import DisplayTasks from '../components/tasks/DisplayTasks';
import CheckAuthentication from '../components/utils/CheckAuthentication';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectArchivedHasBeenUpdated,
	selectLongTermHasBeenUpdated,
	selectMidTermHasBeenUpdated,
	selectShortTermHasBeenUpdated,
} from '../store/selectors/editStateSelectors';
import getUserId from '../api/getUserId';
import { useGetUser } from '../api/getUser';
import { useGetWorkspaces } from '../api/getWorkspaces';
import {
	setArchivedHasBeenUpdated,
	setLongTermHasBeenUpdated,
	setMidTermHasBeenUpdated,
	setShortTermHasBeenUpdated,
} from '../store/feature/editState.slice';
import { useGetShortTermTasks } from '../api/getShortTermTasks';
import { useGetMidTermTasks } from '../api/getMidTermTasks';
import { useGetLongTermTasks } from '../api/getLongTermTasks';
import { useGetArchivedTasks } from '../api/getArchivedTasks';

const Tasks = () => {
	const dispatch = useDispatch();
	const shortTermHasBeenUpdated = useSelector(selectShortTermHasBeenUpdated);
	const midTermHasBeenUpdated = useSelector(selectMidTermHasBeenUpdated);
	const longTermHasBeenUpdated = useSelector(selectLongTermHasBeenUpdated);
	const archivedTermHasBeenUpdated = useSelector(
		selectArchivedHasBeenUpdated
	);
	const [redirectAfterLogin, setRedirectAfterLogin] = useState(false);
	const [userId, setUserId] = useState(null);

	const getId = async () => {
		const id = await getUserId();
		setUserId(id);
	};

	const getUser = useGetUser();
	const getWorkspaces = useGetWorkspaces();
	const getShortTermTasks = useGetShortTermTasks();
	const getMidTermTasks = useGetMidTermTasks();
	const getLongTermTasks = useGetLongTermTasks();
	const getArchivedTasks = useGetArchivedTasks();

	useEffect(() => {
		setRedirectAfterLogin(sessionStorage.getItem('redirectAfterLogin'));
		getId();
	}, [redirectAfterLogin]);

	useEffect(() => {
		const getData = async () => {
			if (userId !== null) {
				await getUser(userId);
				await getWorkspaces(userId);
				await getShortTermTasks(userId);
				await getMidTermTasks(userId);
				await getLongTermTasks(userId);
			}
		};

		getData();
	}, [userId]);

	useEffect(() => {
		if (shortTermHasBeenUpdated) {
			userId !== null && getShortTermTasks(userId);
			dispatch(setShortTermHasBeenUpdated(false));
		}
	}, [shortTermHasBeenUpdated]);

	useEffect(() => {
		if (midTermHasBeenUpdated) {
			userId !== null && getMidTermTasks(userId);
			dispatch(setMidTermHasBeenUpdated(false));
		}
	}, [midTermHasBeenUpdated]);
	useEffect(() => {
		if (longTermHasBeenUpdated) {
			userId !== null && getLongTermTasks(userId);
			dispatch(setLongTermHasBeenUpdated(false));
		}
	}, [longTermHasBeenUpdated]);
	useEffect(() => {
		if (archivedTermHasBeenUpdated) {
			userId !== null && getArchivedTasks(userId);
			dispatch(setArchivedHasBeenUpdated(false));
		}
	}, [archivedTermHasBeenUpdated]);

	return (
		<div className="flex">
			{!redirectAfterLogin ? <CheckAuthentication /> : null}
			<section className="bg-dark-blue text-white text-center">
				<SideBar userId={userId} />
			</section>
			<div className="w-full p-2.5 bg-light-blue">
				<Header />
				<main>
					<DisplayTasks />
				</main>
			</div>
		</div>
	);
};

export default Tasks;

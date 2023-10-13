import React, { useEffect, useState } from 'react';
import SideBar from '../components/sidebar/SideBar';
import Header from '../components/header/Header';
import DisplayTasks from '../components/tasks/DisplayTasks';
import CheckAuthentication from '../components/utils/CheckAuthentication';
import { useDispatch, useSelector } from 'react-redux';
import { selectHasBeenUpdated } from '../store/selectors/editStateSelectors';
import getUserId from '../api/getUserId';
import { useGetUser } from '../api/getUser';
import { useGetWorkspaces } from '../api/getWorkspaces';
import { setHasBeenUpdated } from '../store/feature/editState.slice';
import { useGetShortTermTasks } from '../api/getShortTermTasks';
import { useGetMidTermTasks } from '../api/getMidTermTasks';
import { useGetLongTermTasks } from '../api/getLongTermTasks';

const Tasks = () => {
	const dispatch = useDispatch();
	const hasBeenUpdated = useSelector(selectHasBeenUpdated);
	const [redirectAfterLogin, setRedirectAfterLogin] = useState(false);
	const [userId, setUserId] = useState(null);

	const getId = async () => {
		const id = await getUserId();
		setUserId(id);
	};

	const getUser = useGetUser();
	const getShortTermTasks = useGetShortTermTasks();
	const getMidTermTasks = useGetMidTermTasks();
	const getLongTermTasks = useGetLongTermTasks();
	const getWorkspaces = useGetWorkspaces();

	useEffect(() => {
		setRedirectAfterLogin(sessionStorage.getItem('redirectAfterLogin'));
		getId();
	}, [redirectAfterLogin]);

	useEffect(() => {
		const getData = async () => {
			if (userId !== null) {
				await getUser(userId);
				await getShortTermTasks(userId);
				await getMidTermTasks(userId);
				await getLongTermTasks(userId);
				await getWorkspaces(userId);
			}
		};

		getData();
	}, [userId]);

	useEffect(() => {
		if (hasBeenUpdated) {
			userId !== null && getShortTermTasks(userId);
			dispatch(setHasBeenUpdated(false));
		}
	}, [hasBeenUpdated]);

	return (
		<div className="flex">
			{!redirectAfterLogin ? <CheckAuthentication /> : null}
			<section className="bg-dark-blue text-white text-center">
				<SideBar />
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

import { useLocation, useNavigate } from 'react-router-dom';
import getUserId from '../../api/getUserId';
import ErrorUserId from './ErrorUserId';
import { useEffect, useState } from 'react';

const CheckAuthentication = () => {
	const API_URL = process.env.REACT_APP_API_URL;
	const [error, setError] = useState(null);
	const [errorCode, setErrorCode] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userId = await getUserId(API_URL);
				const currentPath = location.pathname.split('/').pop();

				if (userId && currentPath === 'home') {
					navigate('/dashboard');
				} else if (!userId && currentPath !== 'home') {
					navigate('/home');
				}
			} catch (error) {
				setError(error);
				if (error.response) {
					setErrorCode(error.response.status);
				} else {
					setErrorCode(null);
				}
			}
		};

		fetchData();
		sessionStorage.setItem('redirectAfterLogin', location.pathname);
	}, []);

	if (error) {
		return <ErrorUserId errorCode={errorCode} />;
	}

	return null;
};

export default CheckAuthentication;

import { useLocation, useNavigate } from 'react-router-dom';
import getUserId from '../../api/getUserId';
import ErrorUserId from './ErrorUserId';
import { useEffect, useState } from 'react';

const CheckAuthentication = () => {
	const API_URL = process.env.REACT_APP_API_URL;
	const [error, setError] = useState(null);
	const [errorCode, setErrorCode] = useState(null);
	const [displayErrors, setDisplayErrors] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userId = await getUserId(API_URL);
				const currentPath = location.pathname;

				if (userId && currentPath === '/') {
					navigate('/pages/dashboard');
				} else if (!userId && currentPath !== '/') {
					navigate('/home');
				}
			} catch (error) {
				setError(error);
				if (error.response) {
					setErrorCode(error.response.status);
				} else {
					setErrorCode(null);
				}
				setDisplayErrors(true);
			}
		};

		fetchData();
		sessionStorage.setItem('redirectAfterLogin', location.pathname);
	}, []);

	if (error) {
		return <ErrorUserId errorCode={errorCode} />;
	}

	return displayErrors && <ErrorUserId errorCode={errorCode} />;
};

export default CheckAuthentication;

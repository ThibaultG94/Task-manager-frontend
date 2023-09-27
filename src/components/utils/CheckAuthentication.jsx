import getUserId from '../../api/getUserId';
import ErrorUserId from './ErrorUserId';
import { useEffect, useState } from 'react';

const CheckAuthentication = () => {
	const API_URL = process.env.REACT_APP_API_URL;
	const [error, setError] = useState(null);
	const [errorCode, setErrorCode] = useState(null);
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setUserId(await getUserId(API_URL));
				console.log('userId:', userId);
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
	}, []);

	if (error) {
		return <ErrorUserId errorCode={errorCode} />;
	}

	return null;
};

export default CheckAuthentication;

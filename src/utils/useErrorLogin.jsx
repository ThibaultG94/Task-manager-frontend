import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const useErrorLogin = ({ setInputsFormErrors }) => {
    const navigate = useNavigate();
    const [isDelayActive, setIsDelayActive] = useState(false);
	const [errorCount, setErrorCount] = useState(0);

    const triggerErrorAnimation = () => {
        setIsDelayActive(true);
        setTimeout(() => {
            setIsDelayActive(false);
        }, 3000);
    };

    const errorLogin = (error) => {
        const errorCode = error.response ? error.response.status : 500;
        if (errorCode !== 500) {
            triggerErrorAnimation();
            switch (errorCode) {
                case 404:
                    if (error.response.data.message === 'User not found') {
                        setInputsFormErrors({
                            email: "L'email n'est pas enregistré.",
                            password: null,
                        });
                    }
                    break;
                case 401:
                    if (error.response.data.message === 'Invalid password') {
                        setInputsFormErrors({
                            email: null,
                            password: 'Le mot de passe est incorrect.',
                        });
                    }
                    break;
                default:
                    navigate('/pages/error');
                    break;
            }

			setErrorCount(prev => prev + 1);
        } else {
            navigate('/pages/error-500');
        }
    };

    return { errorLogin, isDelayActive, errorCount };
};

export default useErrorLogin;

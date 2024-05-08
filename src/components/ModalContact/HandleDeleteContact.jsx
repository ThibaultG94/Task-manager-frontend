import React, { useState } from 'react';
import LoadingDeleteComponent from '../Buttons/LoadingDeleteComponent';
import useDeleteContact from '../../api/users/useDeleteContact';

const HandleDeleteContact = () => {
    const deleteContact = useDeleteContact();

    const [isLoading, setIsLoading] = useState(false);

    const handleRemoveContact = async () => {
		setIsLoading(true);
        await deleteContact();
		setIsLoading(false);
    };  

    return (
        <div>
			{isLoading ? (
				<div>
					<LoadingDeleteComponent />
				</div>
			) : (
				<button
				className="text-base hover:text-red-error-2 rounded-md"
				onClick={handleRemoveContact}>
					<i className="fas fa-trash-alt"></i>
				</button>
			)}
		</div>
    );
};

export default HandleDeleteContact;
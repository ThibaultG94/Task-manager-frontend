import React, { useState } from 'react';
import LoadingDeleteComponent from '../Buttons/LoadingDeleteComponent';

const BlockContact = () => {
    const [isLoading, setIsLoading] = useState(false);

	const handleBlockContact = () => {
        // Logique pour bloquer le contact
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
				onClick={handleBlockContact}>
					<i className="fa-solid fa-ban"></i>
				</button>
			)}
		</div>
    );
};

export default BlockContact;
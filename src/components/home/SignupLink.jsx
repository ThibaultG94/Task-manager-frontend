import React, { useState } from 'react';
import SignupModal from './SignupModal';

const SignupLink = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<p className="text-center">
				Pas encore inscrit ?{' '}
				<a href="#" id="signup-link" onClick={openModal}>
					S'inscrire
				</a>
			</p>

			{isModalOpen && <SignupModal />}
		</>
	);
};

export default SignupLink;

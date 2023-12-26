import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/selectors/userSelectors';
import { selectTips } from '../../store/selectors/tipsSelectors';

const TaskPageTip = () => {
	const currentUser = useSelector(selectCurrentUser);
	const tips = useSelector(selectTips);
	const [isUserAcceptTips, setIsUserAcceptTips] = useState(false);
	const [showTip, setShowTip] = useState(false);

	useEffect(() => {
		if (currentUser) setIsUserAcceptTips(currentUser.tips);
	}, [currentUser]);

	useEffect(() => {
		setTimeout(() => {
			if (!isUserAcceptTips) setShowTip(false);
			const tipInfo = JSON.parse(localStorage.getItem('taskPageTipInfo'));

			if (!tipInfo) {
				const expiryDate = new Date();
				expiryDate.setDate(expiryDate.getDate() + 7);
				localStorage.setItem(
					'taskPageTipInfo',
					JSON.stringify({
						shown: true,
						expiryDate: expiryDate.toISOString(),
					})
				);
				setShowTip(true);
			} else if (tipInfo.expiryDate === 'Infinity') {
				setShowTip(false);
			} else if (new Date() > new Date(tipInfo.expiryDate)) {
				setShowTip(true);
			} else {
				setShowTip(false);
			}
		}, 10000);
	}, []);

	const handleClose = (doNotWatchAgainUntil) => {
		const expiryDate = new Date();
		if (doNotWatchAgainUntil === 'Infinity') {
			localStorage.setItem(
				'taskPageTipInfo',
				JSON.stringify({ shown: true, expiryDate: 'Infinity' })
			);
		} else if (doNotWatchAgainUntil === 'Month') {
			expiryDate.setDate(expiryDate.getDate() + 30);
			localStorage.setItem(
				'taskPageTipInfo',
				JSON.stringify({ shown: true, expiryDate })
			);
		}

		const tooltipContainer = document.querySelector('.tooltip-container');
		tooltipContainer.style.animation =
			'fadeOutClose 0.3s ease-in-out forwards';

		setTimeout(() => {
			tooltipContainer.style.display = 'none';
		}, 300);
	};

	if (!showTip) return null;

	return (
		<div className="tooltip-container">
			<div className="tooltip-box">
				<p>
					<em>Astuce :</em> {tips && tips[0]?.content}
				</p>
				<label>
					<input
						type="checkbox"
						onChange={() => handleClose('Infinity')}
					/>
					<span className="ml-2">Ne plus montrer cette astuce</span>
				</label>
				<button
					className="close-button"
					onClick={() => handleClose('Month')}>
					&times;
				</button>
			</div>
		</div>
	);
};

export default TaskPageTip;

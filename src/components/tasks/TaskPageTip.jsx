import React, { useState, useEffect } from 'react';

const TaskPageTip = () => {
	const [showTip, setShowTip] = useState(false);

	useEffect(() => {
		const tipShown = sessionStorage.getItem('taskPageTipShown');
		if (!tipShown) {
			setShowTip(true);
			sessionStorage.setItem('taskPageTipShown', 'true');
		}
	}, []);

	if (!showTip) return null;

	return (
		<div className="tooltip-container">
			<div className="tooltip-box">
				<p>
					<em>Astuce :</em> Double-cliquez sur un champ d'une task
					pour le modifier instantanément.
				</p>
				<button
					className="close-button"
					onClick={() => setShowTip(false)}>
					&times;
				</button>
			</div>
		</div>
	);
};

export default TaskPageTip;

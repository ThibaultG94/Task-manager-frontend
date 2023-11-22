import React, { useEffect, useState } from 'react';
import 'flatpickr/dist/flatpickr.min.css';
import Flatpickr from 'react-flatpickr';
import { French } from 'flatpickr/dist/l10n/fr.js';

const DeadlineInput = ({ taskDeadline, setTaskDeadline }) => {
	const [displayDate, setDisplayDate] = useState(null);

	useEffect(() => {
		let today;
		if (taskDeadline) {
			today = new Date(taskDeadline);
		} else {
			today = new Date();
		}
		const formattedDisplayDay = `${String(today.getDate()).padStart(
			2,
			'0'
		)}/${String(today.getMonth() + 1).padStart(
			2,
			'0'
		)}/${today.getFullYear()}`;
		setDisplayDate(formattedDisplayDay);
		handleDateChange(today);
	}, [taskDeadline]);

	const handleDateChange = (date) => {
		const formattedDBDay = `${date.getFullYear()}-${String(
			date.getMonth() + 1
		).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
		setTaskDeadline(formattedDBDay);

		const formattedDisplayDay = `${String(date.getDate()).padStart(
			2,
			'0'
		)}/${String(date.getMonth() + 1).padStart(
			2,
			'0'
		)}/${date.getFullYear()}`;
		setDisplayDate(formattedDisplayDay);
	};

	return (
		<div className="mb-2 sm:mb-1 md:mb-0 relative">
			<Flatpickr
				className="appearance-none bg-white block border border-gray-300 hover:border-gray-500 focus:outline-none focus:shadow-outline leading-tight p-2 rounded shadow w-full"
				onChange={(date) => handleDateChange(date[0])}
				options={{
					dateFormat: 'd/m/Y',
					locale: French,
				}}
				value={displayDate}
			/>
		</div>
	);
};

export default DeadlineInput;

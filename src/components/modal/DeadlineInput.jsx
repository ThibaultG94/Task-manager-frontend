import React, { useEffect, useState } from 'react';
import 'flatpickr/dist/flatpickr.min.css';
import Flatpickr from 'react-flatpickr';
import { French } from 'flatpickr/dist/l10n/fr.js';

const DeadlineInput = ({ setTaskDeadline }) => {
	const [displayDate, setDisplayDate] = useState(null);

	useEffect(() => {
		const today = new Date();
		const formattedDisplayDay = `${String(today.getDate()).padStart(
			2,
			'0'
		)}/${String(today.getMonth() + 1).padStart(
			2,
			'0'
		)}/${today.getFullYear()}`;
		setDisplayDate(formattedDisplayDay);
		handleDateChange(today);
	}, []);

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
		<div className="relative">
			<Flatpickr
				value={displayDate}
				onChange={(date) => handleDateChange(date[0])}
				options={{
					dateFormat: 'd/m/Y',
					locale: French,
				}}
				className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 p-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
			/>
			<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
				<svg
					className="fill-current h-4 w-4"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20">
					<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
				</svg>
			</div>
		</div>
	);
};

export default DeadlineInput;

import React, { useEffect, useState } from 'react';

const days = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];
const months = [
	'Janvier',
	'Février',
	'Mars',
	'Avril',
	'Mai',
	'Juin',
	'Juillet',
	'Août',
	'Septembre',
	'Octobre',
	'Novembre',
	'Décembre',
];

const Calendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [calendarDays, setCalendarDays] = useState([]);

	const generateDays = () => {};

	useEffect(() => {
		generateDays(currentDate);
	}, [currentDate]);

	return (
		<div className="calendar-container dashboard-card flex justify-center items-center">
			<div id="calendar" className="px-3 overflow-hidden">
				<div className="month-year">
					{`${
						months[currentDate.getMonth()]
					} ${currentDate.getFullYear()}`}
				</div>
				<div className="calendar-header"></div>
			</div>
		</div>
	);
};

export default Calendar;

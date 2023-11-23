import React, { useEffect, useState } from 'react';

const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
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
	const today = new Date().getDate();
	const month = currentDate.getMonth();

	const generateDays = (currentDate) => {
		const year = currentDate.getFullYear();
		const firstDayOfThisMonth = new Date(year, month, 1).getDay();
		const lastDayOfLastMonth = new Date(year, month, 0).getDate();
		const lastDate = new Date(year, month + 1, 0).getDate();

		const prevMonthDays = Array.from(
			{ length: firstDayOfThisMonth === 0 ? 6 : firstDayOfThisMonth - 1 },
			(_, i) => ({ date: lastDayOfLastMonth - i, isOtherMonth: true })
		);
		const currentMonthDays = Array.from({ length: lastDate }, (_, i) => ({
			date: i + 1,
			isOtherMonth: false,
		}));
		const nextMonthDays = Array.from(
			{ length: 42 - (prevMonthDays.length + currentMonthDays.length) },
			(_, i) => ({ date: i + 1, isOtherMonth: true })
		);

		setCalendarDays([
			...prevMonthDays.reverse(),
			...currentMonthDays,
			...nextMonthDays,
		]);
	};

	useEffect(() => {
		generateDays(currentDate);
	}, [currentDate]);

	return (
		<div className="calendar-container dashboard-card flex justify-center items-center">
			<div id="calendar" className="px-1 overflow-hidden">
				<div className="month-year">
					{`${
						months[currentDate.getMonth()]
					} ${currentDate.getFullYear()}`}
				</div>
				<div className="calendar-header">
					{days.map((day) => (
						<div className="calendar-day day-name" key={day}>
							{day}
						</div>
					))}
				</div>
				<div className="calendar-days">
					{calendarDays.map((day, index) => (
						<div
							className={`calendar-day ${
								day.isOtherMonth ? 'other-month' : ''
							} `}
							key={index}>
							{day.date === today && !day.isOtherMonth ? (
								<div className="day today">{day.date}</div>
							) : (
								<div className="day">{day.date}</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Calendar;

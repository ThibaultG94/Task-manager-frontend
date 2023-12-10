export async function getCategoryDay(day, status, taskDate) {
	const today = new Date();
	const todayDayOfWeek = today.getDay();
	const todayMonth = today.getMonth() + 1;
	const todayYear = today.getFullYear();
	const [taskYear, taskMonth, taskDay] = taskDate.split('-').map(Number);
	const taskDateObj = new Date(taskYear, taskMonth - 1, taskDay);
	const taskDayOfWeek = taskDateObj.getDay();
	const dayInt = parseInt(day);

	const isThisWeek = todayDayOfWeek < taskDayOfWeek;
	const isThisWeekOrNextWeek = taskDayOfWeek - todayDayOfWeek;
	const isThisMonth = todayMonth === taskMonth;
	const isThisYear = todayYear === taskYear;
	const isNextYear = taskYear === todayYear + 1;

	if (status === 'Archived') return 'archived-tasks';
	if (day === 'En retard') return 'retard-tasks';
	if (day === "Aujourd'hui") return 'today-tasks';
	if (day === 'Demain') return 'tomorrow-tasks';
	if (day === 'Lundi' || day === 'Mardi')
		return isThisWeekOrNextWeek < 7 ? 'this-week-tasks' : 'next-week-tasks';
	if (['Mercredi', 'Jeudi', 'Vendredi'].includes(day))
		return isThisWeek ? 'this-week-tasks' : 'next-week-tasks';
	if (day === 'Samedi')
		return isThisWeek ? 'this-weekend-tasks' : 'next-weekend-tasks';
	if (day === '7 jours') {
		return taskDayOfWeek === 0 ? 'this-weekend-tasks' : 'next-week-tasks';
	}
	if (dayInt > 7 && dayInt < 14) {
		if (taskDayOfWeek > 5) return 'next-weekend-tasks';
		if (isThisWeek) return 'next-week-tasks';
		return isThisMonth ? 'this-month-tasks' : 'next-month-tasks';
	}
	if (dayInt === 14) {
		if (taskDayOfWeek === 0) return 'next-weekend-tasks';
	}
	if (dayInt >= 14 && dayInt < 31)
		return isThisMonth ? 'this-month-tasks' : 'next-month-tasks';
	if (dayInt >= 31 && dayInt <= 365)
		return isThisYear ? 'this-year-tasks' : 'next-year-tasks';
	if (dayInt > 365) return isNextYear ? 'next-year-tasks' : 'becoming-tasks';

	return 'uncategorized-tasks'; // default case
}

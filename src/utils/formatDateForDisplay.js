const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

function calculateDaysDifference(date1, date2) {
	return Math.round((date1 - date2) / MILLISECONDS_IN_A_DAY);
}

export async function formatDateForDisplay(dateString) {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const inputDate = new Date(dateString);

	const daysDifference = calculateDaysDifference(inputDate, today);

	const dayNames = [
		'Dimanche',
		'Lundi',
		'Mardi',
		'Mercredi',
		'Jeudi',
		'Vendredi',
		'Samedi',
	];

	if (daysDifference < 0) {
		return 'En retard';
	} else if (daysDifference === 0) {
		return "Aujourd'hui";
	} else if (daysDifference === 1) {
		return 'Demain';
	} else if (daysDifference < 7) {
		return dayNames[inputDate.getDay()];
	} else {
		return `${daysDifference} jours`;
	}
}

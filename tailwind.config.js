/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/home.html',
		'./src/pages/dashboard.html',
		'./src/pages/workspace.html',
		'./src/pages/task.html',
	],
	theme: {
		extend: {
			colors: {
				'light-blue': '#eaefff',
				'dark-blue': '#171f39',
				'red-error': '#e1786a',
				'light-grey': '#a8a9b4',
			},
		},
	},
	plugins: [],
};

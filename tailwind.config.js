/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	theme: {
		extend: {
			colors: {
				'light-blue': '#eaefff',
				'dark-blue': '#171f39',
				'red-error': '#e1786a',
				'light-grey': '#a8a9b4',
				'orange-primary': '#ffb360',
			},
			backgroundColor: {
				'modal-bg': 'rgba(0, 0, 0, 0.8)',
			},
			margin: {
				'modal-margin': '5%',
			},
		},
	},
	plugins: [],
};

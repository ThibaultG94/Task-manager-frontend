/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
		'./public/index.html',
		'./node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
	],
	theme: {
		extend: {
			colors: {
				'light-blue': '#eaefff',
				'light-blue-2': '#648cf6',
				'light-blue-3': '#6EFACC',
				'dark-blue': '#171f39',
				'dark-blue-2': '#3d395a',
				'dark-purple': '#67557c',
				'dark-purple-2': '#5A385F',
				'red-error': '#e1786a',
				'red-error-2': '#98000d',
				'red-error-overdue': '#fdded1',
				'light-grey': '#a8a9b4',
				'orange-primary': '#ffb360',
				'pink-primary': '#FFEECA',
				'yellow-primary': '#F9F871',
				'modal-task-bg': '#f9f9f9',
			},
			backgroundColor: {
				'modal-bg': 'rgba(0, 0, 0, 0.6)',
			},
			margin: {
				'modal-margin': '5%',
			},
			cursor: {
				grab: 'grab',
				grabbing: 'grabbing',
			},
			screens: {
				'custom-1120': '1120px',
				'custom-860': '860px',
				'custom-xs': '450px',
			},
		},
	},
	plugins: [
		function ({ addComponents, theme }) {
			addComponents({
				'.button': {
					border: 'none',
					borderRadius: '10px',
					boxShadow: '0 1px 10px rgba(0, 0, 0, 0.2)',
					color: '#ffffff',
					cursor: 'pointer',
					display: 'inline-block',
					fontSize: theme('fontSize.sm'),
					padding: '7px 15px',
					'@screen md': {
						fontSize: theme('fontSize.base'),
						padding: '10px 20px',
					},
					'@screen lg': {
						fontSize: theme('fontSize.lg'),
					},
				},
			});
		},
	],
};

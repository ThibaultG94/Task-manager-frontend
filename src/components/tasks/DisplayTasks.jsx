import React from 'react';

const DisplayTasks = () => {
	return (
		<section id="tasks">
			<div id="retard-tasks" className="task-block">
				<div class="task-block-header">
					<h3>Retard</h3>
					<button class="toggle-button">▶</button>
				</div>
				<div class="task-list"></div>
			</div>

			<div id="today-tasks" className="task-block">
				<div className="task-block-header">
					<h3>Aujourd'hui</h3>
					<button className="toggle-button">▶</button>
				</div>
				<div className="task-list"></div>
			</div>

			<div id="tomorrow-tasks" className="task-block">
				<div className="task-block-header">
					<h3>Demain</h3>
					<button className="toggle-button">▶</button>
				</div>
				<div className="task-list"></div>
			</div>

			<div id="this-week-tasks" className="task-block">
				<div className="task-block-header">
					<h3>Cette semaine</h3>
					<button className="toggle-button">▶</button>
				</div>
				<div className="task-list"></div>
			</div>

			<div id="this-weekend-tasks" className="task-block">
				<div className="task-block-header">
					<h3>Ce Weekend</h3>
					<button className="toggle-button">▶</button>
				</div>
				<div className="task-list"></div>
			</div>

			<div id="next-week-tasks" className="task-block">
				<div className="task-block-header">
					<h3>Semaine prochaine</h3>
					<button className="toggle-button">▶</button>
				</div>
				<div className="task-list"></div>
			</div>

			<div id="next-weekend-tasks" className="task-block">
				<div className="task-block-header">
					<h3>Weekend prochain</h3>
					<button className="toggle-button">▶</button>
				</div>
				<div className="task-list"></div>
			</div>

			<div id="this-month-tasks" className="task-block">
				<div className="task-block-header">
					<h3>Ce mois-ci</h3>
					<button className="toggle-button">▶</button>
				</div>
				<div className="task-list"></div>
			</div>

			<div id="next-month-tasks" className="task-block">
				<div className="task-block-header">
					<h3>Mois prochain</h3>
					<button className="toggle-button">▶</button>
				</div>
				<div className="task-list"></div>
			</div>

			<div className="task-block" id="this-year-tasks">
				<div className="task-block-header">
					<h3>Cette année</h3>
					<button className="toggle-button">▶</button>
				</div>
				<div className="task-list"></div>
			</div>

			<div className="task-block" id="next-year-tasks">
				<div className="task-block-header">
					<h3>Année prochaine</h3>
					<button className="toggle-button">▶</button>
				</div>
				<div className="task-list"></div>
			</div>

			<div className="task-block" id="becoming-tasks">
				<div className="task-block-header">
					<h3>Prochaines années</h3>
					<button className="toggle-button">▶</button>
				</div>
				<div className="task-list"></div>
			</div>

			<div className="task-block" id="archived-tasks">
				<div className="task-block-header">
					<h3>Archives</h3>
					<button className="toggle-button">▶</button>
				</div>
				<div className="task-list"></div>
			</div>
		</section>
	);
};

export default DisplayTasks;

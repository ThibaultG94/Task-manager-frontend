import React from 'react';

const ListWorkspaces = () => {
	return (
		<div className="workspaces-container dashboard-card">
			<h4>Workspaces</h4>
			<div className="h-[80%] flex flex-col justify-between">
				<div
					id="first-workspace-container"
					className="flex p-2 items-center justify-between">
					<div className="flex">
						<div className="mr-3">
							<i className="fa-solid fa-share-nodes"></i>
						</div>
						<div id="firstWorkspace"></div>
					</div>
					<div>
						<div id="firstCoworker"></div>
					</div>
				</div>

				<div
					id="second-workspace-container"
					className="flex p-2 items-center justify-between">
					<div className="flex">
						<div className="mr-3">
							<i className="fa-solid fa-share-nodes"></i>
						</div>
						<div id="secondWorkspace"></div>
					</div>
					<div>
						<div id="secondCoworker"></div>
					</div>
				</div>

				<div
					id="third-workspace-container"
					className="flex p-2 items-center justify-between">
					<div className="flex">
						<div className="mr-3">
							<i className="fa-solid fa-share-nodes"></i>
						</div>
						<div id="thirdWorkspace"></div>
					</div>
					<div>
						<div id="thirdCoworker"></div>
					</div>
				</div>

				<div
					id="fourth-workspace-container"
					className="flex p-2 items-center justify-between">
					<div className="flex">
						<div className="mr-3">
							<i className="fa-solid fa-share-nodes"></i>
						</div>
						<div id="fourthWorkspace"></div>
					</div>
					<div>
						<div id="fourthCoworker"></div>
					</div>
				</div>
			</div>

			<p id="noWorkspace"></p>
		</div>
	);
};

export default ListWorkspaces;

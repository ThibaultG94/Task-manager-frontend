import React from 'react';

const ModalEditWorkspace = ({ workspaceData, setWorkspaceData }) => {
	// useEffect(() => {
	// 	setWorkspaceData((prevState) => ({
	// 		...prevState,
	// 		_id: editedTask?._id,
	// 		title: editedTask?.title,
	// 		status: editedTask?.status,
	// 		priority: editedTask?.priority,
	// 		deadline: editedTask?.deadline,
	// 		description: editedTask?.description,
	// 		selectedWorkspace: editedTask?.workspaceId,
	// 		assignedTo: editedTask?.assignedTo,
	// 		category: editedTask?.category,
	// 	}));
	// }, [editedTask]);

	return (
		<form
			className="max-w-lg mx-auto pl-2 pr-0 md:pl-4 md:pr-2 rounded-lg"
			onSubmit={(e) => e.stopPropagation()}>
			<div className="text-center pt-4 px-2 md:px-4">
				<h5 className="text-gray-900 text-base md:text-lg leading-tight font-medium mb-2">
					<input
						className="appearance-none bg-white block border border-gray-300 hover:border-gray-500 focus:outline-none focus:shadow-outline leading-tight p-2 rounded shadow w-full"
						maxLength={50}
						name="title"
						onChange={(e) =>
							setWorkspaceData((prev) => ({
								...prev,
								title: e.target.value,
							}))
						}
						required
						type="text"
						value={workspaceData.title}
					/>
				</h5>
			</div>

			<div className="md:mt-4 px-2">
				<textarea
					className="appearance-none bg-white block border border-gray-300 hover:border-gray-500 flex-grow focus:outline-none focus:shadow-outline p-2 resize-none rounded shadow w-full"
					cols="30"
					name="description"
					placeholder="Description (optionnel)"
					onChange={(e) =>
						setWorkspaceData((prev) => ({
							...prev,
							description: e.target.value,
						}))
					}
					rows="5"
					value={workspaceData.description}
				/>
			</div>
		</form>
	);
};

export default ModalEditWorkspace;

import React from 'react';
import { TaskStatusIcon } from '../ModalTask/TaskStatusIcon';

const ModalDisplayWorkspace = ({ selectedWorkspace }) => {
    const statusOrder = ['Pending', 'In Progress', 'Completed', 'Archived'];

    return (
        <div className="max-w-lg mx-auto px-6 rounded-lg">
            <div className="text-center pt-4 px-6">
                <h5 className="text-gray-900 text-lg md:text-xl leading-tight font-medium mb-2">
                    {selectedWorkspace?.title}
                </h5>
            </div>

            <div className="mb-4 text-base text-gray-700 px-2">
                <div className="flex flex-wrap justify-end py-1">
                    <span className="text-sm font-bold self-end text-gray-500 py-1">
                        {selectedWorkspace?.membersName.length === 1 ? 'Membre' :
                            `Membres (${selectedWorkspace?.membersName.length})`}
                    </span>
                    {selectedWorkspace?.membersName.map((member, index) => (
                        <div
                            className="assigned-icon mt-2 ml-4 px-2 py-1 rounded-lg bg-light-blue-3"
                            key={index}>
                            <span className="ml-2 text-sm">{member}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap justify-end py-1">
				{selectedWorkspace?.taskStatusCount && Object.values(selectedWorkspace.taskStatusCount).reduce((total, count) => total + count, 0) > 0 &&
					<>
					<span className="text-sm font-bold self-end text-gray-500 py-1 mr-3">
						Tâches ({Object.values(selectedWorkspace.taskStatusCount).reduce((total, count) => total + count, 0)})
					</span>
					{Object.entries(selectedWorkspace.taskStatusCount)
						.filter(([, count]) => count > 0)
						.sort((a, b) => statusOrder.indexOf(a[0]) - statusOrder.indexOf(b[0]))
						.map(([status, count]) => (
						<TaskStatusIcon
							key={status}
							status={status}
							count={count}
						/>
						))
					}
					</>
				}
			</div>

            {selectedWorkspace?.description ? (
                <div className="mt-4 px-2">
                    <div className="bg-gray-100 description-icon p-3 rounded-lg">
                        <span className="ml-2 text-gray-600 whitespace-pre-line">
                            {selectedWorkspace?.description}
                        </span>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default ModalDisplayWorkspace;


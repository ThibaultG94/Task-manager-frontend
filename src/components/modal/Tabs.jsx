import React from 'react';
import CloseButton from './CloseButton';

const Tabs = ({ tabs, activeTab, setActiveTab, closeModal }) => {
	return (
		<div className="flex flex-col">
			<div className="flex items-center justify-between bg-light-blue rounded-t-lg">
				<div className="flex">
					{tabs.map((tab, index) => (
						<button
							key={index}
							onClick={() => setActiveTab(tab.id)}
							className={`${
								activeTab === tab.id
									? `${
											index === 0
												? 'rounded-tl-lg border-dark-blue'
												: ''
									  } bg-dark-blue cursor-default duration-300 inline-block p-2 px-4 text-light-blue text-sm sm:text-base md:text-lg transition-bg`
									: 'cursor-pointer duration-300 inline-block text-gray-800 hover:text-gray-700 p-2 px-4 text-sm sm:text-base md:text-lg transition-bg'
							}`}>
							{tab.label}
						</button>
					))}
				</div>
				<CloseButton onClose={closeModal} modalTabs={true} />
			</div>
			<div className="tab-content">
				{tabs.find((tab) => tab.id === activeTab).component}
			</div>
		</div>
	);
};

export default Tabs;

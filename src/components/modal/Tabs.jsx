import React from 'react';
import CloseButton from './CloseButton';

const Tabs = ({ tabs, activeTab, setActiveTab, closeModal }) => {
	return (
		<div className="flex flex-col">
			<div className="flex justify-between items-center">
				<div className="flex">
					{tabs.map((tab, index) => (
						<button
							key={index}
							onClick={() => setActiveTab(tab.id)}
							className={`${
								activeTab === tab.id
									? `${
											index === 0 ? 'rounded-tl-lg' : ''
									  } text-lg bg-[#171f39] text-[#eaefff] cursor-default inline-block p-2 transition-bg duration-300`
									: 'text-lg text-gray-800 hover:text-gray-700 cursor-pointer inline-block p-2 transition-bg duration-300'
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

import React from 'react';
import CloseButton from '../Buttons/CloseButton';

const Tabs = ({ tabs, activeTab, setActiveTab, closeModal }) => {
	const tabClass = (tabId, index) => {
		const baseClasses =
			'inline-block py-2 px-4 text-sm transition-all duration-300 ';
		const activeClasses = 'bg-light-blue-2 text-light-blue ';
		const inactiveClasses = 'text-gray-800 hover:text-gray-700 ';
		const roundedClass = index === 0 ? 'rounded-tl-lg ' : '';
		const borderClass =
			activeTab === tabId
				? 'border-b-2 border-transparent '
				: 'border-b-2 border-gray-300 hover:border-gray-500 ';

		return `${baseClasses} ${
			activeTab === tabId ? activeClasses : inactiveClasses
		} ${roundedClass} ${borderClass}`;
	};

	return (
		<div className="flex flex-col">
			<div className="flex items-center justify-between bg-white rounded-t-lg">
				<div className="flex">
					{tabs.map((tab, index) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={tabClass(tab.id, index)}>
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

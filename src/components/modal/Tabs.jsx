import React from 'react';

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
				<span
					className="cursor-pointer mr-2 transition-transform duration-200 hover:scale-110"
					onClick={closeModal}>
					<svg
						width="40"
						height="40"
						viewBox="0 0 40 40"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<line
							x1="10"
							y1="10"
							x2="30"
							y2="30"
							stroke="currentColor"
							stroke-width="2"
						/>
						<line
							x1="30"
							y1="10"
							x2="10"
							y2="30"
							stroke="currentColor"
							stroke-width="2"
						/>
					</svg>
				</span>
			</div>
			<div className="tab-content">
				{tabs.find((tab) => tab.id === activeTab).component}
			</div>
		</div>
	);
};

export default Tabs;

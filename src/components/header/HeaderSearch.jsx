import React from 'react';

const HeaderSearch = () => {
	return (
		<div className="flex items-center absolute right-0 top-2.5">
			<div className="mr-5">
				<input
					type="search"
					name="search"
					id="search"
					className="bg-[#f1f1e6] border border-[#171f39]"
				/>
			</div>
		</div>
	);
};

export default HeaderSearch;

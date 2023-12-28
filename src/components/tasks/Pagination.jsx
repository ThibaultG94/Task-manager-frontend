const Pagination = ({ currentPage, setPage, totalPages }) => {
	const handleKeyDown = (event, page) => {
		if (event.key === 'Enter') {
			setPage(page);
		}
	};

	return (
		<div className="flex items-center justify-center space-x-1 pb-4">
			{Array.from({ length: totalPages }, (_, index) => index + 1).map(
				(page) => (
					<div
						key={page}
						role="button"
						tabIndex={0}
						onClick={(e) => {
							e.stopPropagation();
							setPage(page);
						}}
						onKeyDown={(event) => handleKeyDown(event, page)}
						aria-label={`Go to page ${page}`}
						className={`cursor-pointer px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
							currentPage === page
								? 'bg-orange-primary text-white'
								: 'bg-white text-gray-700 hover:bg-pink-primary'
						}`}>
						{page}
					</div>
				)
			)}
		</div>
	);
};

export default Pagination;

import { useDispatch } from 'react-redux';
import { setCurrentArchivedPage } from '../store/feature/pages.slice';

const Pagination = ({ currentPage, setPage, totalPages }) => {
	const dispatch = useDispatch();

	const handleKeyDown = (event, page) => {
		if (event.key === 'Enter') {
			setPage(page);
			dispatch(setCurrentArchivedPage(page));
		}
	};

	return (
		<div className="flex flex-wrap items-center justify-center space-x-1 pb-2 sm:pb-4">
			{Array.from({ length: totalPages }, (_, index) => index + 1).map(
				(page) => (
					<div
						key={page}
						className={`cursor-pointer px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-200 ${
							currentPage === page
								? 'bg-orange-primary text-white'
								: 'bg-white text-gray-700 hover:bg-pink-primary'
						} sm:inline-block sm:mr-2`}
						onClick={(e) => {
							e.stopPropagation();
							setPage(page);
							dispatch(setCurrentArchivedPage(page));
						}}
						onKeyDown={(event) => handleKeyDown(event, page)}
						aria-label={`Go to page ${page}`}>
						{page}
					</div>
				)
			)}
		</div>
	);
};

export default Pagination;

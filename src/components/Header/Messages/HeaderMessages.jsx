import React from 'react';

const HeaderMessages = () => {
    return (
        <div className="flex relative mr-2 sm:mr-4 h-8 sm:h-10 md:h-12 mt-2 md:mt-0 items-center justify-center">
            <span className="cursor-pointer text-dark-blue text-2xl sm:text-3xl">
                <i className="fa-regular fa-envelope"></i>
			</span>
        </div>
    );
};

export default HeaderMessages;
import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-white/50 backdrop-blur-md border-gray-200 dark:bg-neutral-900 fixed top-0 left-0 right-0 z-50 bg border-b-2 border-neutral-800">
            <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
                <a href="#" className="text-gray-700 dark:text-gray-200 mx-1.5 sm:mx-6">Generate</a>
                <a href="#" className="text-gray-700 dark:text-gray-500 border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200  mx-1.5 sm:mx-6">Gallery</a>
            </div>
        </nav>
    );
};

export default Navbar;

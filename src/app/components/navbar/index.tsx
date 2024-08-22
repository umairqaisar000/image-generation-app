"use client";

import useAuth from '@/app/hooks/userAuth';
import { auth } from '@/app/utils/firebase';
import { signOut } from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SignInModel from '../signInModel';
import SignUpModal from '../signUpModel';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const [isSelected, setIsSelected] = useState<number>(0);
    const { user, loading } = useAuth();

    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

    const openSignInModal = () => {
        setIsSignUpModalOpen(false); // Close sign-in modal when opening sign-up modal
        setIsSignInModalOpen(true);
    };
    const closeSignInModal = () => setIsSignInModalOpen(false);

    const openSignUpModal = () => {
        setIsSignInModalOpen(false); // Close sign-in modal when opening sign-up modal
        setIsSignUpModalOpen(true);
    };

    const closeSignUpModal = () => setIsSignUpModalOpen(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User signed out successfully");
            // Optionally, redirect user to a different page after logout
            // window.location.href = '/login';
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > 0);
        };

        window.addEventListener('scroll', handleScroll);

        // Update isSelected based on the current pathname
        if (pathname === '/gallery') {
            setIsSelected(1);
        } else {
            setIsSelected(0);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [pathname]); // Depend on pathname so it updates when the path changes

    const handleTabClick = (index: number, path: string) => {
        setIsSelected(index);
        router.push(path);
    };

    return (
        <>
            <nav
                className={`backdrop-blur-md bg-opacity-50 bg-neutral-900 fixed top-0 left-0 right-0 z-50 border-neutral-800 transition-all duration-300 ${scrolled ? 'border-b-2 border-neutral-800' : 'border-b-0'
                    }`}
            >

                <div className="container flex items-center justify-between p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
                    {/* Logo */}
                    <div className="flex items-center">
                        <a href="/" className="text-white text-xl font-bold">Genera.Ai</a>
                    </div>

                    {/* Navigation buttons */}
                    {
                        user ? (<div className="flex-grow flex items-center justify-center space-x-6">
                            <button
                                className={`mx-1.5 sm:mx-6 ${isSelected === 0 ? 'text-gray-800 dark:text-gray-200' : 'text-gray-700 dark:text-gray-500 border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200'
                                    }`}
                                onClick={() => handleTabClick(0, '/')}
                            >
                                Generate
                            </button>
                            <button
                                className={`mx-1.5 sm:mx-6 ${isSelected === 1 ? 'text-gray-800 dark:text-gray-200' : 'text-gray-700 dark:text-gray-500 border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200'
                                    }`}
                                onClick={() => handleTabClick(1, '/gallery')}
                            >
                                Gallery
                            </button>
                        </div>) : ""
                    }


                    {/* Login and Signup buttons */}
                    {
                        !user ? (<div className="flex items-center space-x-2">
                            <button onClick={openSignInModal} className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white">
                                <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Login
                                </span>
                            </button>
                            <button onClick={openSignUpModal} className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white">
                                <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Signup
                                </span>
                            </button>
                        </div>) : <button onClick={handleLogout} className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white">
                            <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Logout
                            </span>
                        </button>
                    }
                </div>
            </nav>
            <SignInModel isOpen={isSignInModalOpen} onClose={closeSignInModal} openSignUpModal={openSignUpModal} />
            <SignUpModal isOpen={isSignUpModalOpen} onClose={closeSignUpModal} openSignInModal={openSignInModal} />
        </>
    );
}

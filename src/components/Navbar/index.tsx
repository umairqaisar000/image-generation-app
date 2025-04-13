"use client";

import { auth } from '@/app/utils/firebase';
import { signOut } from 'firebase/auth';
import { LogOut, Menu, User, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import SignInModel from '../SignInModel';
import SignUpModal from '../SignUpModel';

// NavLink component for desktop navigation
interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
    return (
        <Link href={href}>
            <span className=" text-gray-300 hover:text-white transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-cosmic-purple after:transition-all after:duration-300 hover:after:w-full">
                {children}
            </span>
        </Link>
    );
};

// NavLink for mobile navigation
interface MobileNavLinkProps {
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, children, onClick }) => {
    return (
        <Link href={href} onClick={onClick}>
            <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-cosmic-purple/10 transition-colors duration-300">
                {children}
            </span>
        </Link>
    );
};

// Navbar component
const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user] = useAuthState(auth);
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Scroll to section on the home page
    const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
        e.preventDefault();

        // Check if we're on the home page
        const isHomePage = window.location.pathname === '/';

        if (isHomePage) {
            const section = document.querySelector(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // If not on home page, redirect to home with hash
            router.push(`/${sectionId}`);
        }

        // Close mobile menu if open
        setIsOpen(false);
    };

    // Authentication modal handlers
    const openSignInModal = () => {
        setIsSignUpModalOpen(false);
        setIsSignInModalOpen(true);
    };

    const closeSignInModal = () => setIsSignInModalOpen(false);

    const openSignUpModal = () => {
        setIsSignInModalOpen(false);
        setIsSignUpModalOpen(true);
    };

    const closeSignUpModal = () => setIsSignUpModalOpen(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsDropdownOpen(false);
            router.push('/');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    const handleAuthButtonClick = () => {
        if (user) {
            handleLogout();
        } else {
            openSignInModal();
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const getUserInitial = () => {
        if (user?.displayName) {
            return user.displayName.charAt(0).toUpperCase();
        } else if (user?.email) {
            return user.email.charAt(0).toUpperCase();
        }
        return 'U';
    };

    return (
        <>
            <nav className={`backdrop-blur-lg ${scrolled ? 'border-b border-white/10' : ''} fixed top-0 left-0 w-full z-30 transition-all duration-300 ${scrolled ? 'bg-cosmic-deep shadow-md' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Link href="/" className="text-white font-bold text-2xl">
                                    <span className="bg-gradient-to-r from-cosmic-purple to-cosmic-blue bg-clip-text text-transparent">
                                        Genera
                                    </span>
                                    <span className="text-white">.ai</span>
                                </Link>
                            </div>
                        </div>

                        {/* Desktop navigation */}
                        <div className="hidden md:flex items-center space-x-8 ">
                            {user ? (
                                <>
                                    <NavLink href="/dashboard">Dashboard</NavLink>
                                    <div className="relative" ref={dropdownRef}>
                                        <button
                                            onClick={toggleDropdown}
                                            className="flex items-center space-x-2 focus:outline-none"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cosmic-purple to-cosmic-blue flex items-center justify-center text-white">
                                                {user.photoURL ? (
                                                    <Image
                                                        src={user.photoURL}
                                                        alt="Profile"
                                                        width={32}
                                                        height={32}
                                                        className="w-8 h-8 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <span>{getUserInitial()}</span>
                                                )}
                                            </div>
                                        </button>

                                        {isDropdownOpen && (
                                            <div className="absolute right-0 mt-2 w-48 bg-cosmic-deep rounded-md shadow-lg py-1 z-50 border border-white/10">
                                                <div className="px-4 py-2 border-b border-white/10">
                                                    <p className="text-sm text-white font-medium truncate">
                                                        {user.displayName || user.email}
                                                    </p>
                                                </div>
                                                <Link href="/dashboard">
                                                    <span className="block px-4 py-2 text-sm text-gray-200 hover:bg-cosmic-purple/20 flex items-center">
                                                        <User className="w-4 h-4 mr-2" />
                                                        Dashboard
                                                    </span>
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-cosmic-purple/20 flex items-center"
                                                >
                                                    <LogOut className="w-4 h-4 mr-2" />
                                                    Log out
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <a href="#features" onClick={(e) => scrollToSection(e, '#features')} className="text-gray-300 hover:text-white transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-cosmic-purple after:transition-all after:duration-300 hover:after:w-full">Features</a>
                                    <a href="#gallery" onClick={(e) => scrollToSection(e, '#gallery')} className="text-gray-300 hover:text-white transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-cosmic-purple after:transition-all after:duration-300 hover:after:w-full">Gallery</a>
                                    <a href="#about" onClick={(e) => scrollToSection(e, '#about')} className="text-gray-300 hover:text-white transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-cosmic-purple after:transition-all after:duration-300 hover:after:w-full">About</a>
                                    <button
                                        onClick={openSignInModal}
                                        className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cosmic-purple to-cosmic-blue hover:opacity-90 transition-opacity duration-300 text-white font-medium"
                                    >
                                        Get Started
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                            >
                                {isOpen ? (
                                    <X className="block h-6 w-6" />
                                ) : (
                                    <Menu className="block h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden bg-cosmic-deep shadow-lg border-t border-white/5">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {user ? (
                                <>
                                    <div className="px-3 py-2 border-b border-white/10 mb-2 flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cosmic-purple to-cosmic-blue flex items-center justify-center text-white mr-2">
                                            {user.photoURL ? (
                                                <Image
                                                    src={user.photoURL}
                                                    alt="Profile"
                                                    width={32}
                                                    height={32}
                                                    className="w-8 h-8 rounded-full object-cover"
                                                />
                                            ) : (
                                                <span>{getUserInitial()}</span>
                                            )}
                                        </div>
                                        <span className="text-sm text-white font-medium truncate">
                                            {user.displayName || user.email}
                                        </span>
                                    </div>
                                    <MobileNavLink href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</MobileNavLink>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-cosmic-purple/10 transition-colors duration-300 flex items-center"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Log out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <a href="#features" onClick={(e) => scrollToSection(e, '#features')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-cosmic-purple/10 transition-colors duration-300">Features</a>
                                    <a href="#gallery" onClick={(e) => scrollToSection(e, '#gallery')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-cosmic-purple/10 transition-colors duration-300">Gallery</a>
                                    <a href="#about" onClick={(e) => scrollToSection(e, '#about')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-cosmic-purple/10 transition-colors duration-300">About</a>
                                    <div className="py-2">
                                        <button
                                            onClick={openSignInModal}
                                            className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-cosmic-purple to-cosmic-blue hover:opacity-90 transition-opacity duration-300 text-white font-medium"
                                        >
                                            Get Started
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Authentication Modals */}
            <SignInModel isOpen={isSignInModalOpen} onClose={closeSignInModal} openSignUpModal={openSignUpModal} />
            <SignUpModal isOpen={isSignUpModalOpen} onClose={closeSignUpModal} openSignInModal={openSignInModal} />
        </>
    );
};

export default Navbar;

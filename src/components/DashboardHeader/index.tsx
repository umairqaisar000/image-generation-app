"use client";

import { auth } from '@/app/utils/firebase';
import { LogOut, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const DashboardHeader: React.FC = () => {
    const [user] = useAuthState(auth);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    const handleLogout = async () => {
        try {
            await auth.signOut();
            router.push('/');
        } catch (error) {
            console.error("Error signing out: ", error);
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

    if (!user) {
        return null;
    }

    return (
        <header className="bg-cosmic-deep border-b border-white/10 py-2 sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
                    <div className="flex items-center">
                        <Link href="/" className="text-white font-bold text-2xl">
                            <span className="bg-gradient-to-r from-cosmic-purple to-cosmic-blue bg-clip-text text-transparent">
                                Genera
                            </span>
                            <span className="text-white">.ai</span>
                        </Link>
                    </div>

                    {/* User profile section */}
                    <div className="flex items-center">
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center space-x-3 focus:outline-none"
                            >
                                <span className="text-white text-sm mr-2 hidden sm:block">
                                    {user.displayName || user.email}
                                </span>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cosmic-purple to-cosmic-blue flex items-center justify-center text-white overflow-hidden">
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
                                    <Link href="/">
                                        <span className="block px-4 py-2 text-sm text-gray-200 hover:bg-cosmic-purple/20 flex items-center">
                                            <User className="w-4 h-4 mr-2" />
                                            Home
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
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader; 
'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const NotFound = () => {
    const pathname = usePathname();

    useEffect(() => {
        console.error(
            "404 Error: User attempted to access non-existent route:",
            pathname
        );
    }, [pathname]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-cosmic-dark">
            <div className="text-center glass-card p-8 rounded-xl max-w-md">
                <h1 className="text-6xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-cosmic-purple to-cosmic-blue bg-clip-text text-transparent">
                        404
                    </span>
                </h1>
                <p className="text-xl text-gray-300 mb-6">Oops! Page not found</p>
                <Link
                    href="/"
                    className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-cosmic-purple to-cosmic-blue hover:opacity-90 transition-opacity text-white font-medium"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Return to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
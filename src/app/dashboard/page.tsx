'use client';

import useAuth from '@/app/hooks/userAuth';
import Dashboard from '@/components/Dashboard';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    // Hide Navbar on dashboard pages by adding a class to the body
    useEffect(() => {
        // Add a class to body for CSS targeting
        document.body.classList.add('dashboard-page');

        return () => {
            // Clean up by removing the class
            document.body.classList.remove('dashboard-page');
        };
    }, []);

    // Redirect if not logged in
    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-cosmic-dark">
                <div className="text-cosmic-purple">Loading...</div>
            </div>
        );
    }

    return <Dashboard />;
} 
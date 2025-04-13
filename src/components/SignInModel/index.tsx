"use client";

import { auth } from '@/app/utils/firebase';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import GradientButton from '../GradientButton';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    openSignUpModal: () => void;
}

const SignInModel: React.FC<ModalProps> = ({ isOpen, onClose, openSignUpModal }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    if (!isOpen) return null;

    const handleSignIn = async (e: React.MouseEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            onClose();
            setLoading(false);
            router.push('/dashboard');
        } catch (err) {
            setError('Failed to sign in. Please check your credentials.');
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async (e: React.MouseEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            onClose();
            setLoading(false);
            router.push('/dashboard');
        } catch (err) {
            setError('Failed to sign in with Google.');
            setLoading(false);
        }
    };

    return (
        <>
            <div
                className="fixed top-0 right-0 bottom-0 left-0 bg-black/50 backdrop-blur-sm
                z-20"
                onClick={onClose}
            ></div>
            <div
                id="authentication-modal"
                tabIndex={-1}
                aria-hidden={!isOpen}
                className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden"
            >

                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative rounded-lg shadow bg-cosmic-dark border border-white/10">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-neutral-700">
                            <h3 className="text-xl font-semibold text-white">
                                Sign in
                            </h3>
                            <button
                                type="button"
                                className="text-neutral-400 bg-transparent hover:bg-neutral-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-neutral-600 dark:hover:text-white"
                                onClick={onClose}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <div className="p-4 md:p-5">
                            <form className="space-y-4" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-neutral-800 border border-neutral-700 text-white text-sm rounded-lg focus:ring-cosmic-purple focus:border-cosmic-purple block w-full p-2.5 placeholder-gray-400"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Your password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-neutral-800 mb-2 border border-neutral-700 text-white text-sm rounded-lg focus:ring-cosmic-purple focus:border-cosmic-purple block w-full p-2.5 placeholder-gray-400"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                {error && <p className="text-red-500">{error}</p>}

                                <GradientButton onClick={handleSignIn} isLoading={loading} text={'Login with Email'} className='w-full' />

                                <div className="flex items-center my-4">
                                    <hr className="flex-grow border-neutral-700" />
                                    <span className="px-3 text-neutral-400 text-sm">OR</span>
                                    <hr className="flex-grow border-neutral-700" />
                                </div>

                                <button
                                    type="button"
                                    onClick={handleGoogleSignIn}
                                    disabled={loading}
                                    className="w-full flex items-center justify-center space-x-2 bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 transition-colors duration-300 text-white rounded-lg p-2.5"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    <span>Sign in with Google</span>
                                </button>

                                <div className="text-sm font-medium text-gray-300 text-center">
                                    Not registered? <span className="hover:underline text-cosmic-purple cursor-pointer" onClick={openSignUpModal}>Create account</span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </>

    );
};

export default SignInModel;

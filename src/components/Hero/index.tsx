import { ArrowDown } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import SignInModel from '../SignInModel';
import SignUpModal from '../SignUpModel';
import { TypewriterEffect } from '../ui/typewriter-effect';

const Hero: React.FC = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

    useEffect(() => {
        const handleParallax = () => {
            if (!heroRef.current) return;

            const scrollPosition = window.scrollY;
            const heroHeight = heroRef.current.offsetHeight;
            const scrollPercentage = Math.min(scrollPosition / heroHeight, 1);

            if (titleRef.current) {
                titleRef.current.style.transform = `translateY(${scrollPercentage * 50}px)`;
                titleRef.current.style.opacity = `${1 - scrollPercentage * 1.5}`;
            }

            if (subtitleRef.current) {
                subtitleRef.current.style.transform = `translateY(${scrollPercentage * 70}px)`;
                subtitleRef.current.style.opacity = `${1 - scrollPercentage * 1.5}`;
            }

            if (buttonRef.current) {
                buttonRef.current.style.transform = `translateY(${scrollPercentage * 90}px)`;
                buttonRef.current.style.opacity = `${1 - scrollPercentage * 1.5}`;
            }
        };

        window.addEventListener('scroll', handleParallax);
        return () => window.removeEventListener('scroll', handleParallax);
    }, []);

    const scrollToFeatures = () => {
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToGallery = () => {
        const gallerySection = document.getElementById('gallery');
        if (gallerySection) {
            gallerySection.scrollIntoView({ behavior: 'smooth' });
        }
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

    return (
        <>
            <div
                ref={heroRef}
                id="hero"
                className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
            >
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-cosmic-dark">
                    <div className="absolute inset-0 bg-gradient-cosmic opacity-50"></div>
                    <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-glow-purple blur-3xl"></div>
                    <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-cosmic-blue/10 blur-3xl"></div>
                </div>

                {/* Star-like particles with bottom to up animation */}
                <div className="stars absolute inset-0">
                    {[...Array(150)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute h-1 w-1 rounded-full bg-white animate-pulse-glow"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${3 + Math.random() * 4}s`,
                                animation: `pulse-glow ${3 + Math.random() * 4}s ease-in-out infinite, moveUpwards ${10 + Math.random() * 15}s linear infinite`
                            }}
                        />
                    ))}
                </div>

                {/* Hero content */}
                <div className="container max-w-full mx-auto relative z-10">
                    <h1
                        ref={titleRef}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight parallax-slow mb-6"
                    >
                        <span className="block bg-gradient-to-r from-cosmic-purple via-white to-cosmic-blue bg-clip-text text-transparent pb-2">
                            <TypewriterEffect words={[
                                { text: "AI-Powered", className: "text-4xl md:text-5xl lg:text-6xl" },
                                { text: "Image", className: "text-4xl md:text-5xl lg:text-6xl" },
                                { text: "Generation", className: "text-4xl md:text-5xl lg:text-6xl" },
                            ]} cursorClassName='bg-cosmic-blue' className="w-full text-center" />
                        </span>
                        {/* <span className="block bg-gradient-to-r from-cosmic-purple via-white to-cosmic-blue bg-clip-text text-transparent pb-2">
                           
                        </span> */}
                        <span className="text-white">For Your Creative Vision</span>
                    </h1>

                    <p
                        ref={subtitleRef}
                        className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto parallax-medium"
                    >
                        Transform your ideas into stunning visuals with our state-of-the-art AI.
                        Create unique artwork, designs, and illustrations in seconds.
                    </p>

                    <div
                        ref={buttonRef}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 parallax-fast"
                    >
                        <button onClick={openSignInModal} className="px-8 py-3 rounded-lg bg-gradient-to-r from-cosmic-purple to-cosmic-blue hover:opacity-90 transition-all text-white font-medium shadow-lg shadow-cosmic-purple/20">
                            Create Now
                        </button>
                        <button onClick={scrollToGallery} className="px-8 py-3 rounded-lg border border-white/20 hover:border-white/30 hover:bg-white/5 transition-all text-white">
                            View Gallery
                        </button>
                    </div>
                </div>

                {/* Scroll down indicator */}
                <div
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
                    onClick={scrollToFeatures}
                >
                    <ArrowDown className="h-6 w-6 text-white/70" />
                </div>
            </div>

            {/* Authentication modals */}
            <SignInModel
                isOpen={isSignInModalOpen}
                onClose={closeSignInModal}
                openSignUpModal={openSignUpModal}
            />
            <SignUpModal
                isOpen={isSignUpModalOpen}
                onClose={closeSignUpModal}
                openSignInModal={openSignInModal}
            />
        </>
    );
};

export default Hero;
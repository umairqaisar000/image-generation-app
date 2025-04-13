'use client';

import React from 'react';
import About from '../About';
import CTASection from '../CTASection';
import Features from '../Features';
import Footer from '../Footer';
import Gallery from '../Gallery';
import Hero from '../Hero';

const Home: React.FC = () => {
    return (
        <div className="bg-cosmic-dark min-h-screen text-white">
            <Hero />
            <Features />
            <Gallery />
            <About />
            <CTASection />
            <Footer />
        </div>
    );
};

export default Home; 
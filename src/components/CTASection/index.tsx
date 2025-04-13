import React from 'react';

const CTASection: React.FC = () => {
    return (
        <section className="relative py-24 bg-cosmic-dark overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-cosmic opacity-30"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl max-h-96 bg-glow-purple blur-3xl opacity-20"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center glass-card py-16 px-6 rounded-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-cosmic-purple to-cosmic-blue bg-clip-text text-transparent">
                            Ready to Transform
                        </span>
                        <span className="text-white"> Your Creative Process?</span>
                    </h2>

                    <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
                        Join thousands of creators who are already using Genera.ai to bring their ideas to life.
                        Start generating stunning images today.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-cosmic-purple to-cosmic-blue hover:opacity-90 transition-all text-white font-medium min-w-40">
                            Get Started Free
                        </button>
                        <button className="px-8 py-3 rounded-lg border border-white/20 hover:border-white/30 hover:bg-white/5 transition-all text-white min-w-40">
                            View Pricing
                        </button>
                    </div>

                    <p className="mt-6 text-sm text-gray-400">
                        No credit card required. Start with 25 free generations.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CTASection;

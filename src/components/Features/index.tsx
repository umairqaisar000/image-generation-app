import { ImageIcon, LayersIcon, PenToolIcon, Sparkles, WandIcon, ZapIcon } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

const Features: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observeElements = () => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('opacity-100', 'translate-y-0');
                            entry.target.classList.remove('opacity-0', 'translate-y-10');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.1 }
            );

            featureRefs.current.forEach((ref) => {
                if (ref) observer.observe(ref);
            });

            return observer;
        };

        const observer = observeElements();

        return () => {
            observer.disconnect();
        };
    }, []);

    const featureItems = [
        {
            icon: <Sparkles className="h-10 w-10 text-cosmic-purple" />,
            title: "AI-Powered Generation",
            description: "Create stunning images from text descriptions using cutting-edge AI algorithms."
        },
        {
            icon: <PenToolIcon className="h-10 w-10 text-cosmic-purple" />,
            title: "Advanced Editing",
            description: "Fine-tune your generated images with an intuitive set of editing tools."
        },
        {
            icon: <WandIcon className="h-10 w-10 text-cosmic-purple" />,
            title: "Style Transfer",
            description: "Apply artistic styles from famous artworks to your generated images."
        },
        {
            icon: <ZapIcon className="h-10 w-10 text-cosmic-purple" />,
            title: "Real-Time Results",
            description: "See your creations come to life instantly with our high-speed processing."
        },
        {
            icon: <LayersIcon className="h-10 w-10 text-cosmic-purple" />,
            title: "Layer Control",
            description: "Manipulate individual elements within your images for perfect compositions."
        },
        {
            icon: <ImageIcon className="h-10 w-10 text-cosmic-purple" />,
            title: "High Resolution",
            description: "Export your images in ultra-high resolution for professional use."
        }
    ];

    return (
        <section
            id="features"
            ref={sectionRef}
            className="relative py-24 bg-cosmic-deep"
        >
            {/* Background accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cosmic-purple/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cosmic-purple/50 to-transparent"></div>

            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cosmic-purple to-cosmic-blue bg-clip-text text-transparent inline-block">
                        Powerful Features
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Unlock your creative potential with our comprehensive suite of AI image generation tools.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featureItems.map((feature, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                featureRefs.current[index] = el;
                            }}
                            className="glass-card rounded-xl p-6 transform transition-all duration-500 opacity-0 translate-y-10"
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-cosmic-purple/10 backdrop-blur mb-4 mx-auto">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-center text-white">
                                {feature.title}
                            </h3>
                            <p className="text-gray-300 text-center">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
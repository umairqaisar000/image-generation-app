import { CloudIcon, ShieldIcon, ZapIcon } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

const About: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current || !imageRef.current || !contentRef.current) return;

            const sectionRect = sectionRef.current.getBoundingClientRect();
            const scrollPosition = window.scrollY;
            const sectionTop = sectionRect.top + scrollPosition;
            const sectionHeight = sectionRect.height;
            const windowHeight = window.innerHeight;

            // Calculate how far through the section we've scrolled
            const scrollProgress = (scrollPosition + windowHeight - sectionTop) / (sectionHeight + windowHeight);

            if (scrollProgress > 0 && scrollProgress < 1) {
                // Apply parallax effect
                imageRef.current.style.transform = `translateY(${scrollProgress * -50}px)`;
                contentRef.current.style.transform = `translateY(${scrollProgress * 30}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative py-24 bg-cosmic-deep overflow-hidden"
        >
            {/* Background accent elements */}
            <div className="absolute top-1/3 -right-32 w-64 h-64 rounded-full bg-cosmic-purple/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cosmic-dark to-transparent"></div>

            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center">
                    {/* Image side */}
                    <div
                        ref={imageRef}
                        className="w-full lg:w-1/2 mb-12 lg:mb-0 transition-transform duration-700 ease-out"
                    >
                        <div className="relative mx-auto max-w-md">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-cosmic-purple to-cosmic-blue rounded-2xl blur-sm opacity-70"></div>
                            <div className="relative bg-cosmic-dark rounded-2xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1567095761054-7a02e69e5c43"
                                    alt="AI generating art"
                                    className="w-full h-auto"
                                />
                            </div>
                            <div className="absolute -right-5 -bottom-5 w-24 h-24 bg-cosmic-purple/10 backdrop-blur-md rounded-xl border border-cosmic-purple/20 flex items-center justify-center animate-float">
                                <ZapIcon className="h-10 w-10 text-cosmic-purple" />
                            </div>
                        </div>
                    </div>

                    {/* Content side */}
                    <div
                        ref={contentRef}
                        className="w-full lg:w-1/2 lg:pl-16 transition-transform duration-700 ease-out"
                    >
                        <div className="max-w-lg">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                <span className="bg-gradient-to-r from-cosmic-purple to-cosmic-blue bg-clip-text text-transparent">
                                    Reimagine
                                </span>{" "}
                                <span className="text-white">Visual Creation</span>
                            </h2>
                            <p className="text-gray-300 mb-8">
                                Genera.ai leverages the latest advancements in AI to transform how creators bring their visions to life. Our platform combines powerful algorithms with an intuitive interface, making advanced image generation accessible to everyone from professional designers to casual creators.
                            </p>

                            <div className="space-y-6">
                                <FeatureItem
                                    icon={<CloudIcon className="h-6 w-6 text-cosmic-purple" />}
                                    title="Cloud-Based Processing"
                                    description="Generate images using our powerful cloud infrastructure without taxing your local machine."
                                />
                                <FeatureItem
                                    icon={<ZapIcon className="h-6 w-6 text-cosmic-purple" />}
                                    title="Lightning Fast Results"
                                    description="Get high-quality images in seconds, not minutes or hours."
                                />
                                <FeatureItem
                                    icon={<ShieldIcon className="h-6 w-6 text-cosmic-purple" />}
                                    title="Secure & Private"
                                    description="Your creations and prompts remain private and secure on our encrypted platform."
                                />
                            </div>

                            {/* <div className="mt-10">
                                <button className="px-6 py-3 rounded-lg bg-cosmic-deep border border-cosmic-purple/30 hover:border-cosmic-purple/60 transition-colors text-white font-medium">
                                    Learn More About Our Technology
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

interface FeatureItemProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => {
    return (
        <div className="flex items-start">
            <div className="flex-shrink-0 p-2 bg-cosmic-purple/10 rounded-lg mr-4">
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
                <p className="text-gray-400">{description}</p>
            </div>
        </div>
    );
};

export default About;
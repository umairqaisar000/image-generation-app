import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// Define image data structure
interface ImageItem {
    id: number;
    url: string;
    title: string;
    prompt: string;
}

const Gallery: React.FC = () => {
    const galleryRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Sample image data (in a real app, this would be fetched from an API)
    const images: ImageItem[] = [
        {
            id: 1,
            url: "https://images.unsplash.com/photo-1655635949212-1d8f4f103ea1",
            title: "Cybernetic Dreamscape",
            prompt: "Futuristic city with neon lights and flying vehicles"
        },
        {
            id: 2,
            url: "https://images.unsplash.com/photo-1561100344-0cce8621ca6c",
            title: "Ethereal Forest",
            prompt: "Mystical forest with glowing plants and magical creatures"
        },
        {
            id: 3,
            url: "https://images.unsplash.com/photo-1620503374956-c942862f0372",
            title: "Cosmic Portal",
            prompt: "A portal to another dimension with cosmic energy flowing through"
        },
        {
            id: 4,
            url: "https://images.unsplash.com/photo-1642893013812-fae55caf38e9?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Quantum Resonance",
            prompt: "Abstract quantum particles forming a pattern in space"
        },
        {
            id: 5,
            url: "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b",
            title: "Organic Architecture",
            prompt: "Buildings that look like they've grown organically from the earth"
        }
    ];

    const nextImage = () => {
        setActiveIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (!galleryRef.current) return;

            const galleryRect = galleryRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (galleryRect.top < windowHeight * 0.75 && galleryRect.bottom > windowHeight * 0.25) {
                const parallaxElements = galleryRef.current.querySelectorAll('.parallax-element');
                const scrollPercentage = (windowHeight * 0.75 - galleryRect.top) / (windowHeight * 0.5);

                parallaxElements.forEach((el, index) => {
                    const speed = 0.1 + (index % 3) * 0.05;
                    const yOffset = scrollPercentage * speed * 100;
                    (el as HTMLElement).style.transform = `translateY(${yOffset}px)`;
                });
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section
            id="gallery"
            ref={galleryRef}
            className="relative py-24 overflow-hidden bg-cosmic-dark"
        >
            {/* Background accent */}
            <div className="absolute inset-0 bg-glow-purple opacity-30"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cosmic-purple to-cosmic-blue bg-clip-text text-transparent inline-block">
                        Image Gallery
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Explore stunning AI-generated artwork created with our platform.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto bg-cosmic-deep/50 rounded-2xl glass-card p-4 md:p-8">
                    {/* Navigation arrows */}
                    <button
                        onClick={prevImage}
                        className="absolute top-1/2 left-4 z-20 -translate-y-1/2 bg-cosmic-dark/70 hover:bg-cosmic-dark/90 p-2 rounded-full transition-colors"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="h-6 w-6 text-white" />
                    </button>

                    <button
                        onClick={nextImage}
                        className="absolute top-1/2 right-4 z-20 -translate-y-1/2 bg-cosmic-dark/70 hover:bg-cosmic-dark/90 p-2 rounded-full transition-colors"
                        aria-label="Next image"
                    >
                        <ChevronRight className="h-6 w-6 text-white" />
                    </button>

                    {/* Image carousel */}
                    <div className="overflow-hidden rounded-xl">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                        >
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className="w-full flex-shrink-0 h-80 md:h-96 lg:h-[500px] relative"
                                >
                                    <img
                                        src={image.url}
                                        alt={image.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-cosmic-dark/80 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-6 z-10">
                                        <h3 className="text-2xl font-bold text-white mb-2">{image.title}</h3>
                                        <p className="text-gray-300 text-sm md:text-base">
                                            <span className="text-cosmic-purple">Prompt:</span> {image.prompt}
                                        </p>
                                    </div>
                                    {/* <div className="absolute top-4 right-4">
                                        <button className="bg-cosmic-dark/50 hover:bg-cosmic-dark/70 p-2 rounded-lg flex items-center gap-1 text-xs text-white transition-colors">
                                            <span>Details</span>
                                            <ArrowUpRight className="h-3 w-3" />
                                        </button>
                                    </div> */}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Carousel indicators */}
                    <div className="flex justify-center gap-2 mt-4">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`h-2 rounded-full transition-all ${index === activeIndex
                                    ? "w-8 bg-cosmic-purple"
                                    : "w-2 bg-gray-500 hover:bg-gray-400"
                                    }`}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-cosmic-purple to-cosmic-blue hover:opacity-90 transition-all text-white font-medium">
                        Explore Full Gallery
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
import { ArrowUpIcon, GithubIcon, InstagramIcon, TwitterIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Footer: React.FC = () => {
    const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
        scrollToSection(e, '#hero');
    };


    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth scroll function for anchor links
    const scrollToSection = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, href: string) => {
        e.preventDefault();

        // Handle external links
        if (href.startsWith('http') || href.startsWith('/')) {
            window.location.href = href;
            return;
        }

        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);

        if (element) {
            // Use scrollIntoView for better browser compatibility
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Apply offset for fixed navbar after scroll
            setTimeout(() => {
                const scrolledY = window.scrollY;
                if (scrolledY) {
                    window.scroll(0, scrolledY - 80);
                }
            }, 0);
        } else if (href === '#') {
            // Scroll to top if href is just '#'
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Fallback to traditional navigation if element not found
            window.location.href = href;
        }

        setIsOpen(false); // Close mobile menu after clicking
    };

    return (
        <footer className="bg-cosmic-dark pt-16 pb-8 relative">
            {/* Top decoration line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cosmic-purple/50 to-transparent"></div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Logo and description */}
                    <div className="md:col-span-2">
                        <Link href="/" className="text-xl font-bold text-white flex items-center mb-4">
                            <span className="mr-2 text-2xl bg-gradient-to-r from-cosmic-purple to-cosmic-blue bg-clip-text text-transparent">
                                Genera.ai
                            </span>
                        </Link>
                        <p className="text-gray-400 mb-6 max-w-sm">
                            A cutting-edge AI image generation platform for creators, designers, and visionaries.
                            Transform your ideas into stunning visuals in seconds.
                        </p>
                        <div className="flex space-x-4">
                            <SocialLink href="https://twitter.com" icon={<TwitterIcon size={20} />} />
                            <SocialLink href="https://instagram.com" icon={<InstagramIcon size={20} />} />
                            <SocialLink href="https://github.com" icon={<GithubIcon size={20} />} />
                        </div>
                    </div>

                    {/* Quick links */}
                    {/* <div>
                        <h3 className="text-white font-semibold mb-4">Product</h3>
                        <ul className="space-y-4">
                            <FooterLink href="#features" onClick={(e) => scrollToSection(e, '#features')}>Features</FooterLink>
                            <FooterLink href="#gallery" onClick={(e) => scrollToSection(e, '#gallery')}>Gallery</FooterLink>
                            <FooterLink href="#" onClick={(e) => scrollToSection(e, '#pricing')}>Pricing</FooterLink>
                            <FooterLink href="#" onClick={(e) => scrollToSection(e, '#documentation')}>Documentation</FooterLink>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <FooterLink href="#">About Us</FooterLink>
                            <FooterLink href="#">Blog</FooterLink>
                            <FooterLink href="#">Careers</FooterLink>
                            <FooterLink href="#">Contact</FooterLink>
                        </ul>
                    </div> */}
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        © 2025 Genera.ai All rights reserved.
                    </p>
                    <div className="flex items-center space-x-6">
                        {/* <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a> */}
                        <button
                            onClick={(e) => scrollToTop(e)}
                            className="p-2 rounded-full bg-cosmic-deep hover:bg-cosmic-purple/20 transition-colors focus:outline-none"
                            aria-label="Scroll to top"
                        >
                            <ArrowUpIcon size={16} className="text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

interface SocialLinkProps {
    href: string;
    icon: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon }) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-cosmic-deep hover:bg-cosmic-purple/20 rounded-full transition-colors"
        >
            <span className="text-gray-300 hover:text-white">{icon}</span>
        </a>
    );
};

interface FooterLinkProps {
    href: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, onClick, children }) => {
    return (
        <li>
            <a
                href={href}
                onClick={onClick}
                className="text-gray-400 hover:text-white transition-colors"
            >
                {children}
            </a>
        </li>
    );
};

export default Footer;
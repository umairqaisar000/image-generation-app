"use client";

import Image from 'next/image';
import React from 'react';

interface ImageModalProps {
    src: string;
    alt: string;
    onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, alt, onClose }) => {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div className="relative max-w-4xl max-h-full ">
                <Image
                    src={src}
                    alt={alt}
                    layout="responsive"
                    width={500}
                    height={500}
                    objectFit="cover"
                    className="transition-transform duration-300 rounded-lg"
                />
                <button
                    className="absolute top-4 right-4 text-white bg-gray-800 bg-opacity-20 hover:bg-opacity-70 px-[10px] py-[3px] rounded-full"
                    onClick={onClose}
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default ImageModal;

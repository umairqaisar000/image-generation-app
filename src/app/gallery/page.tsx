'use client';


import { get, getDatabase, ref } from 'firebase/database';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ImageModal from '../components/imageModel';
import useAuth from '../hooks/userAuth';

export default function Gallery() {
    const [images, setImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { user, loading } = useAuth();

    useEffect(() => {
        if (user) {
            const fetchImages = async () => {
                try {
                    const database = getDatabase();
                    const imagesRef = ref(database, `images/${user.uid}`);
                    console.log(imagesRef);
                    const snapshot = await get(imagesRef);
                    console.log(snapshot);
                    if (snapshot.exists()) {
                        const imagesData = snapshot.val();
                        const userImages = Object.values(imagesData).map((item: any) => item.url);
                        setImages(userImages);
                    } else {
                        setImages([]); // No images found
                    }
                } catch (error) {
                    console.error('Error fetching images:', error);
                    setImages([]); // Handle the error by setting empty array
                }
            };

            fetchImages();
        }
    }, [user]);

    const handleImageClick = (src: string) => {
        console.log(src);
        setSelectedImage(src);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen py-10">

            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8">Image Gallery</h1>
                {images.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {images.map((src, index) => (
                            <div
                                key={index}
                                className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                                onClick={() => handleImageClick(src)}
                            >
                                <Image
                                    src={src}
                                    alt={`Image ${index + 1}`}
                                    layout="responsive"
                                    width={500}
                                    height={500}
                                    objectFit="cover"
                                    className="hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No images found.</p>
                )}
                {selectedImage && (
                    <ImageModal
                        src={selectedImage}
                        alt="Selected Image"
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </div>
    );
}

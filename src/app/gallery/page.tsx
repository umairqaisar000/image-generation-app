'use client';


import { get, getDatabase, ref } from 'firebase/database';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import NoImageFound from '../../../public/no_image_found.svg';
import ImageModal from '../components/imageModel';
import useAuth from '../hooks/userAuth';

export default function Gallery() {
    const [images, setImages] = useState<{ id: string, url: string }[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { user, loading } = useAuth();


    useEffect(() => {
        if (user) {
            const fetchImages = async () => {
                try {
                    const database = getDatabase();
                    const imagesRef = ref(database, `images/${user.uid}`);
                    const snapshot = await get(imagesRef);
                    if (snapshot.exists()) {
                        const imagesData = snapshot.val();
                        console.log(imagesData);
                        const userImages = Object.entries(imagesData).map(([id, item]: [string, any]) => ({ id, url: item.url }));
                        setImages(userImages);
                    } else {
                        setImages([]);
                    }
                } catch (error) {
                    console.error('Error fetching images:', error);
                    setImages([]);
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
                        {images.map(({ id, url }, index) => (
                            <div
                                key={id} // Use ID as key
                                className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                                onClick={() => handleImageClick(url)}
                            >
                                <Image
                                    src={url}
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
                    <div className="flex flex-col justify-center items-center mt-24">
                        <Image src={NoImageFound} width={300} height={300} alt={""} />
                        <p className="text-lg font-semibold text-gray-300 mt-10 tracking-wide shadow-md">
                            It looks like there are no images in this gallery. Check back later!
                        </p>
                    </div>
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

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        domains: ['cdn.pixabay.com', 'res.cloudinary.com'],
    },
};

export default nextConfig;

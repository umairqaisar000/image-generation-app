/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.pixabay.com', 'res.cloudinary.com'],
    },
    async rewrites() {
        return [
            {
                source: '/api/proxy',
                destination: '/api/proxy/route.ts',
            },
        ];
    },
};

export default nextConfig;

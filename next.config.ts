import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // разрешенные источники для загрузки изображений
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'eda.ru',
            },
        ],
    },
};

export default nextConfig;

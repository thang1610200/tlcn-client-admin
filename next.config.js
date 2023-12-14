/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ui-avatars.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'tlcn-upload.s3.ap-southeast-1.amazonaws.com',
                pathname: '**',
            }
        ]
    }
}

module.exports = nextConfig

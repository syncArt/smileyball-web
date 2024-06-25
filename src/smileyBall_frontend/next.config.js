/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    typescript: {
        ignoreBuildErrors: true
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://127.0.0.1:4943/api/:path*'
            }
        ];
    },
    env: {
        ...Object.keys(process.env)
            .filter((key) => key.startsWith('CANISTER_') || key.startsWith('DFX_'))
            .reduce((acc, key) => {
                acc[key] = process.env[key];
                return acc;
            }, {})
    }
}

module.exports = nextConfig

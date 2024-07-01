//remember to remove .ic-assets.json5 from -out- dir
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../..', '.env'), override: true })

/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    output: 'export',
    distDir: 'out',
    typescript: {
        ignoreBuildErrors: true
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true
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

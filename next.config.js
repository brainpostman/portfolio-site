/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        additionalData: `@import "./src/styles/vars.scss";`,
    },
};

module.exports = nextConfig;

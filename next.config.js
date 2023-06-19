/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires

const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        additionalData: `@import "./src/styles/vars.scss";`,
    },
};

module.exports = nextConfig;

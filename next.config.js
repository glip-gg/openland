/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com"]
  }
}

const withTM = require('next-transpile-modules')(['scatter-gl']);

module.exports = withTM(nextConfig);

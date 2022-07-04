/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
      domains: [
          "lh3.googleusercontent.com",
          "live-nft-hosted-assets.s3.ap-south-1.amazonaws.com",
          'openland.s3.us-east-2.amazonaws.com']
  },
    typescript: {
        ignoreBuildErrors: true,
    }
}

module.exports = nextConfig

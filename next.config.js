/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.dicebear.com'],
  },
  swcMinify: true,
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['cdn.pixabay.com','avatars.dicebear.com','upload.wikimedia.org'],
  },
  swcMinify: true,
}

module.exports = nextConfig

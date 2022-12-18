/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.dicebear.com', 'upload.wikimedia.org'],
  },
  swcMinify: true,
}

module.exports = nextConfig

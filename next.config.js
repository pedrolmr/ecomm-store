/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  images: {
    domains: ['images.stockx.com', 'cdn.shopify.com'],
  },
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "i.pravatar.cc",
      "randomuser.me",
      "www.bxkentucky.com",
      "theme.zdassets.com",
      "www.lynnimaging.com",
      "upload.wikimedia.org",
      "encrypted-tbn0.gstatic.com",
      "scontent-ord5-1.xx.fbcdn.net",
      "mce-blob.vercel.app",
      "mce.blob.vercel-storage.com",
    ],
  },
}

module.exports = nextConfig


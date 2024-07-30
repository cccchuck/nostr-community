/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.discordapp.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/discord',
        destination: 'https://discord.gg/r9bQZn6hst',
        permanent: true,
      },
      {
        source: '/lnfi-summer',
        destination: 'https://nostr-community.gitbook.io/lnfi-summer',
        permanent: true,
      },
    ]
  },
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/flags',
        permanent: true,
      },

{
        source: '/',
        destination: '/dashboard/flags',
        permanent: true,
      },
    ]
  },

reactStrictMode: false,

eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

 typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig

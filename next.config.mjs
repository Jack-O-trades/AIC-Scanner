/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8000/api/:path*',
        },
        {
          source: '/scan/',
          destination: 'http://localhost:8000/scan/',
        },
        {
          source: '/admin/:path*',
          destination: 'http://localhost:8000/admin/:path*',
        },
      ],
    };
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  experimental: {
    typedRoutes: false,
  },
};

export default nextConfig;

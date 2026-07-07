import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@tuanh68/types', '@tuanh68/schemas', '@tuanh68/utils', '@tuanh68/ui'],
};

export default nextConfig;

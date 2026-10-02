/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@react-pdf/renderer"],
  experimental: {
    esmExternals: "loose",
  },
};

export default nextConfig;

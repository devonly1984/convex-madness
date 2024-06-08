

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lovely-flamingo-139.convex.cloud",
        port: "",
      },
      {
        protocol: "https",
        hostname: "",
        port: "",
      },
    ],
  },
};

export default nextConfig;

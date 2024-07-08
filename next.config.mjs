/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qspuuapdorddzvkjuhlp.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
    domains: ["lh3.googleusercontent.com"],
  },
  // output: "export",
};

export default nextConfig;

import { fileURLToPath } from "node:url";

const apiOrigin = process.env.NEXT_PUBLIC_API_URL;
const api = apiOrigin ? new URL(apiOrigin) : null;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/kemahasiswaan",
        destination: "/advokasi",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: api
      ? [
          {
            protocol: api.protocol === "https:" ? "https" : "http",
            hostname: api.hostname,
            port: api.port,
            pathname: "/uploads/**",
          },
        ]
      : [],
  },
  outputFileTracingRoot: fileURLToPath(new URL(".", import.meta.url)),
  devIndicators: false,
};
export default nextConfig;

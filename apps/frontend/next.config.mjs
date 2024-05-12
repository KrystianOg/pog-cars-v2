import * as packageJson from "./package.json" with { type: "json" };

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.sharp = "commonjs sharp";
    return config;
  },
  env: {
    version: packageJson.version,
  },
};

export default nextConfig;

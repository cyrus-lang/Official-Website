import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

let userConfig = undefined;
try {
  userConfig = await import("./v0-user-next.config");
} catch (e) {
  // ignore error
}

const baseNextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
};

function mergeConfig(baseConfig, userConfig) {
  if (!userConfig) return baseConfig;

  const mergedConfig = { ...baseConfig };

  for (const key in userConfig) {
    if (
      typeof mergedConfig[key] === "object" &&
      !Array.isArray(mergedConfig[key])
    ) {
      mergedConfig[key] = {
        ...mergedConfig[key],
        ...userConfig[key],
      };
    } else {
      mergedConfig[key] = userConfig[key];
    }
  }

  return mergedConfig;
}

const nextConfig = mergeConfig(baseNextConfig, userConfig);

const withNextIntl = createNextIntlPlugin();
const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

const finalConfig = withNextIntl(withMDX(nextConfig));

export default finalConfig;

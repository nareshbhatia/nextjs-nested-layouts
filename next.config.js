/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    staleTimes: {
      // See https://nextjs.org/docs/app/api-reference/next-config-js/staleTimes
      dynamic: 0,
      static: 0,
    },
  },
};

module.exports = nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Pages under auth()/force-dynamic re-run on every navigation by default
    // (staleTimes.dynamic = 0). 30s lets quick tab switching reuse the
    // already-rendered result; mutations and router.refresh() still bypass it.
    staleTimes: {
      dynamic: 30,
    },
  },
};

export default nextConfig;

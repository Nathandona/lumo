import type { NextConfig } from "next"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)
// Absolute path to react-hook-form's ESM build (bypasses the package "exports"
// restriction and forces a single ESM copy so named exports resolve in the
// pre-built @lumo-ui/core dist).
const rhfEsm = require.resolve("react-hook-form").replace(/index\.cjs\.js$/, "index.esm.mjs")

const nextConfig: NextConfig = {
  transpilePackages: ["@lumo-ui/core", "@lumo-ui/hooks", "@lumo-ui/utils"],
  webpack: (config) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-hook-form$": rhfEsm,
    }
    return config
  },
}

export default nextConfig

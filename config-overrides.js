const webpack = require("webpack");

module.exports = function override(config, env) {
  // Add ".mjs" extension support
  config.resolve.extensions = [...(config.resolve.extensions || []), ".mjs"];

  // Add fallbacks for Node.js core modules
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
    zlib: require.resolve("browserify-zlib"),
    vm: require.resolve("vm-browserify"), // Polyfill 'vm' module for browser
  });
  config.resolve.fallback = fallback;

  // Add plugins for providing process and Buffer
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);

  // Disable source maps in production
  if (env === "production") {
    config.devtool = false;
  }

  // Ignore source maps for specific libraries
  config.module.rules = config.module.rules.map((rule) => {
    if (rule.loader && rule.loader.includes("source-map-loader")) {
      rule.exclude = [/node_modules\/superstruct/]; // Ignore source maps for 'superstruct'
    }
    return rule;
  });

  return config;
};

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  devServer: {
    proxy: {
      "/github": {
        target: "https://github.com",
        changeOrigin: true,
        pathRewrite: {
          "^/github": "",
        },
        logLevel: "debug",
      },
    },
  },
});

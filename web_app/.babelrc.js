module.exports = {
  presets: [["next/babel"]],
  plugins: [
    "@babel/plugin-proposal-do-expressions",
    [
      "import",
      {
        libraryName: "antd",
        libraryDirectory: "lib",
        style: "less",
      },
    ],
    [
      "import",
      {
        libraryName: "@ant-design/icons",
        libraryDirectory: "lib/icons",
        camel2DashComponentName: false,
      },
      "@ant-design/icons",
    ],
    [
      "styled-components",
      {
        ssr: true,
        preprocess: true,
        displayName: false,
      },
    ],
    [
      "babel-plugin-module-resolver",
      {
        root: [".", "./src"],
      },
    ],
  ],
};

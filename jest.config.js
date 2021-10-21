const config = {
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>src/setupTests.js"],
  moduleNameMapper: {
    "^.*\\.s?css$": "<rootDir>/config/nonJsFilesStub.js",
    "^.*\\.svg$": "<rootDir>/config/nonJsFilesStub.js",
  },
  testEnvironment: "jsdom"
};

module.exports = config;

const config = {
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>src/setupTests.js"],
  moduleNameMapper: {
    "^.*\\.s?css$": "<rootDir>/jest-stubs/nonJsFilesStub.js",
    "^.*\\.svg$": "<rootDir>/jest-stubs/nonJsFilesStub.js",
  },
  testEnvironment: "jsdom"
};

module.exports = config;

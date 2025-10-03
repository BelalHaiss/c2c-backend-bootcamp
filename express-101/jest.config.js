const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  coverageDirectory: "./coverage",
  detectOpenHandles: true,
  testTimeout: 30000,
  globalTeardown: "./tests/setup/global-teardown.ts",
};


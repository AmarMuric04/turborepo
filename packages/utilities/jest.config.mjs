/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/__tests__"],
  moduleFileExtensions: ["ts", "js"],
  moduleDirectories: ["node_modules", "src"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
  },
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  testMatch: ["**/__tests__/**/*.test.ts"],
  verbose: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}"],
};

export default config;

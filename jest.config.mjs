import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './frontend',
});

const config = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/frontend/$1',
    '^@lib/(.*)$': '<rootDir>/lib/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/frontend/**/*.test.{ts,tsx}'],
};

export default createJestConfig(config);

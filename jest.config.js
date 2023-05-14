module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
  verbose: true,
  collectCoverageFrom: [
    'src/**/*.tsx',
    'src/**/*.ts',
    '!src/**/*.test.tsx',
    '!src/test-dev.tsx',
    '!**/*.d.ts',
    '!**/assets/**',
    '!**/node_modules/**',
    '!**/dist/**',
  ],
  coverageReporters: ['lcov'],
}

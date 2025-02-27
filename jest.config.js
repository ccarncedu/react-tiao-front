module.exports = {
    moduleFileExtensions: ['js', 'json', 'jsx'],
    rootDir: '.',
    testRegex: 'src/tests/.*\\.test\\.jsx$',
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    collectCoverageFrom: [
      'src/**/*.{js,jsx}',
      '!src/**/*.js',
      '!**/node_modules/**',
      '!**/dist/**',
    ],
    coverageDirectory: './coverage',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '^@src/(.*)$': '<rootDir>/src/$1',
      '^@tests/(.*)$': '<rootDir>/src/tests/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    detectOpenHandles: true,
  };
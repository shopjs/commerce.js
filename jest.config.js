const esModules = ['hashids'].join('|');

module.exports = {
  testEnvironment: 'node',
  roots: [
    '<rootDir>/src',
  ],
  transform: {
    '\\.(ts|tsx)?$': 'ts-jest',
    '\\.(js|jsx)?$': './jestTransform.js',
  },
  transformIgnorePatterns: [`node_modules/(?!(hashids)/)`],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
}

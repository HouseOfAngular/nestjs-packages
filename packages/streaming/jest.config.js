const pack = require('./package');

module.exports = {
  displayName: pack.name,
  name: pack.name,
  preset: '../../jest.config.js',
  globals: { 'ts-jest': { tsConfig: '<rootDir>/tsconfig.spec.json' } }
};

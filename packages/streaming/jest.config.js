const pack = require('./package');

module.exports = {
  displayName: pack.name,
  name: pack.name,
  preset: '../../jest.config.js',
  globals: { 'ts-jest': { tsconfig: '<rootDir>/tsconfig.spec.json' } }
};

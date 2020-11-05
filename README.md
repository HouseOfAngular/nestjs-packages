# ValueAdd NestJS Packages

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![build](https://github.com/valueadd-poland/nestjs-packages/workflows/MASTER%20CI/badge.svg)](https://github.com/valueadd-poland/nestjs-packages/actions?query=workflow%3A%22MASTER+CI%22)

A collection of packages, modules and utilities for NestJS.

| Package                                     | Description                                                               | Version                                                                                                                           | Changelog                                     |
| ------------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| [`@valueadd/download`](./packages/download) | NestJS module that allows to stream the file content from the controller. | [![version](https://img.shields.io/npm/v/@valueadd/nestjs-download.svg)](https://www.npmjs.com/package/@valueadd/nestjs-download) | [changelog](./packages/download/CHANGELOG.md) |

## Development

### Setup

- `$ npm install`
- `$ npm run lerna bootstrap`

### Publish packages

- `npm run lerna version -- --conventional-graduate`
- `npm run lerna publish from-git`

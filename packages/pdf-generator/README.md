# @valueadd/nestjs-ng-pdf-generator

[![version](https://img.shields.io/npm/v/@valueadd/nestjs-ng-pdf-generator.svg)](https://www.npmjs.com/package/@valueadd/nestjs-ng-pdf-generator)
[![downloads](https://img.shields.io/npm/dt/@valueadd/nestjs-ng-pdf-generator.svg)](https://www.npmjs.com/package/@valueadd/nestjs-ng-pdf-generator)

> Extension to the [@nestjs/ng-universal](https://github.com/nestjs/ng-universal) that adds the generic endpoint 'pdf-generator' that will return Angular view converted to the pdf.
> GET request to the pdf-generator/:any-path will open your app at the "any-path" and trigger the "to pdf" browser action.

## Usage

1. Adjust your angular app for the SSR with NestJS (sample: https://github.com/TrilonIO/universal-nest).
2. Instead of `AngularUniversalModule.forRoot` import `PdfGeneratorModule.forRoot`

## Notice

- Name of the generated pdf will be taken from the tab title.
- Your client app will be opened as a localhost. It may cause a CORS exception on requests to your API.
- Your Angular app have access to the Request object. You can pass headers from the request to the 'pdf-generator/' by adding them to the forwardHeaders option in `PdfGeneratorModule.forRoot`. You can use it to authenticate your Angular app by forwarding Authentication header.
- Exceptions from the HttpClient in the client application are passed as the result of PdfGenerator.

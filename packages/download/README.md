# @valueadd/nestjs-download

[![version](https://img.shields.io/npm/v/@valueadd/nestjs-download.svg)](https://www.npmjs.com/package/@valueadd/nestjs-download)
[![downloads](https://img.shields.io/npm/dt/@valueadd/nestjs-download.svg)](https://www.npmjs.com/package/@valueadd/nestjs-download)

NestJS module that allows to stream the file content from the controller.

## Installation

`npm install --save-dev @valueadd/nestjs-download`

## Usage

#### **`app.controller.ts`**

```ts
import { Controller, Get, Headers, Inject, Param, Res } from '@nestjs/common';
import {
  ResponseStreamerFactory,
  responseStreamerFactoryToken,
  StreamingType
} from '@valueadd/nestjs-download';

@Controller()
export class AppController {
  constructor(
    @Inject(responseStreamerFactoryToken)
    private responseStreamerFactory: ResponseStreamerFactory
  ) {}

  @Get('')
  async downloadFile(@Res() res): Promise<void> {
    return this.responseStreamerFactory(StreamingType.Full, res).stream({
      contentType: 'application/png',
      size: 1024,
      stream: () => fs.createReadStream('file.png')
    });
  }
}
```

#### **`app.module.ts`**

```ts
import { Module } from '@nestjs/common';
import { DownloadExpressModule } from '@valueadd/nestjs-download';
import { AppController } from './app.controller';

@Module({
  imports: [DownloadExpressModule],
  controllers: [AppController]
})
export class AppModule {}
```

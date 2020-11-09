# @valueadd/nestjs-streaming

[![version](https://img.shields.io/npm/v/@valueadd/nestjs-streaming.svg)](https://www.npmjs.com/package/@valueadd/nestjs-streaming)
[![downloads](https://img.shields.io/npm/dt/@valueadd/nestjs-streaming.svg)](https://www.npmjs.com/package/@valueadd/nestjs-streaming)

Useful providers that allows working with streaming like responses

## Installation

`npm install --save-dev @valueadd/nestjs-streaming`

## Available modules

- DownloadExpressModule
- StreamingExpressModule
- UrlStreamerNativeModule

## Usage

Download nad Streaming modules provide services that pass your stream as a response and set headers appropriate for each case.

UrlStreamer provide a service that allows you to easily get the url as a stream.

#### Example

#### **`app.controller.ts`**

```ts
import { Controller, Get, Inject, Res } from '@nestjs/common';
import {
  ResponseStreamerFactory,
  responseStreamerFactoryToken,
  StreamingType
} from '@valueadd/nestjs-streaming';

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
import { DownloadExpressModule } from '@valueadd/nestjs-streaming';
import { AppController } from './app.controller';

@Module({
  imports: [DownloadExpressModule],
  controllers: [AppController]
})
export class AppModule {}
```

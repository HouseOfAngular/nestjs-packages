import { Module } from '@nestjs/common';
import {
  responseStreamerFactory,
  responseStreamerFactoryToken
} from './response-streaming/response-streamer.factory';

@Module({
  providers: [
    {
      provide: responseStreamerFactoryToken,
      useValue: responseStreamerFactory
    }
  ],
  exports: [responseStreamerFactoryToken]
})
export class StreamingExpressModule {}

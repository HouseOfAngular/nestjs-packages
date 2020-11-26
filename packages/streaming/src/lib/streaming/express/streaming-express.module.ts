import { Module } from '@nestjs/common';
import { responseStreamerFactoryToken } from '../shared/interfaces/response-streamer.factory';
import { responseStreamerFactory } from './response-streaming/response-streamer.factory';

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

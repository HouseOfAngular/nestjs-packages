import { Module } from '@nestjs/common';
import { NativeUrlStreamerProvider } from './native-url-streamer.provider';
import { UrlStreamingProvider } from '../interfaces/url-streaming.provider';

@Module({
  controllers: [],
  providers: [{ provide: UrlStreamingProvider, useClass: NativeUrlStreamerProvider }],
  exports: [UrlStreamingProvider]
})
export class UrlStreamerNativeModule {}

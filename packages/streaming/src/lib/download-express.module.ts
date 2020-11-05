import { Module } from '@nestjs/common';
import {
  downloadProviderExpressFactory,
  downloadProviderFactoryToken
} from './download-provider-express.factory';

@Module({
  providers: [
    {
      provide: downloadProviderFactoryToken,
      useValue: downloadProviderExpressFactory
    }
  ],
  exports: [downloadProviderFactoryToken]
})
export class DownloadExpressModule {}

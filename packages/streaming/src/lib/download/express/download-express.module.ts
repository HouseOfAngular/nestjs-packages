import { Module } from '@nestjs/common';
import { downloadProviderFactoryToken } from '../shared/interfaces/download-provider.factory';
import { downloadProviderExpressFactory } from './download-provider-express.factory';

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

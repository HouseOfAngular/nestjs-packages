import { Module } from '@nestjs/common';
import { downloadProviderFactoryToken } from '../shared/interfaces/download-provider.factory';
import { downloadProviderFactory } from './download-provider.factory';

@Module({
  providers: [
    {
      provide: downloadProviderFactoryToken,
      useValue: downloadProviderFactory
    }
  ],
  exports: [downloadProviderFactoryToken]
})
export class DownloadFastifyModule {}

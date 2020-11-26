import { DownloadProviderService } from './download-provider.service';
import { DownloadProviderFactory } from '../shared/interfaces/download-provider.factory';

export const downloadProviderFactory: DownloadProviderFactory = (res: any) =>
  new DownloadProviderService(res);

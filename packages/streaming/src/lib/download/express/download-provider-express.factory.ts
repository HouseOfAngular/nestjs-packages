import { DownloadProviderExpressService } from './download-provider-express.service';
import { DownloadProviderFactory } from '../shared/interfaces/download-provider.factory';

export const downloadProviderExpressFactory: DownloadProviderFactory = (res: any) =>
  new DownloadProviderExpressService(res);

import { Response } from 'express';
import { DownloadProviderExpressService } from './download-provider-express.service';
import { DownloadProvider } from './ports/download.provider';

export const downloadProviderFactoryToken = Symbol('downloadProviderFactoryToken');

export type DownloadProviderFactory = (res: Response) => DownloadProvider;

export const downloadProviderExpressFactory: (res: Response) => DownloadProviderExpressService = (
  res: Response
) => new DownloadProviderExpressService(res);

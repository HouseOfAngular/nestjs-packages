import { Test } from '@nestjs/testing';
import { DownloadProviderExpressService } from './download-provider-express.service';
import { Response } from 'express';

describe('DownloadProviderExpressService', () => {
  let service: DownloadProviderExpressService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: DownloadProviderExpressService,
          useFactory: (): DownloadProviderExpressService =>
            new DownloadProviderExpressService(({} as unknown) as Response)
        }
      ]
    }).compile();

    service = module.get(DownloadProviderExpressService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

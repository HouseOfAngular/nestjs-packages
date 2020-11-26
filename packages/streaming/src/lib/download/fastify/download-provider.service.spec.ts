import { Test } from '@nestjs/testing';
import { DownloadProviderService } from './download-provider.service';
import { FastifyReply } from 'fastify';

describe('DownloadProviderService', () => {
  let service: DownloadProviderService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: DownloadProviderService,
          useFactory: (): DownloadProviderService =>
            new DownloadProviderService(({} as unknown) as FastifyReply)
        }
      ]
    }).compile();

    service = module.get(DownloadProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

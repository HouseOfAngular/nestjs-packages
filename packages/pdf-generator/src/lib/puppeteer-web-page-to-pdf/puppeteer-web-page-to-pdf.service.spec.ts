import { Test, TestingModule } from '@nestjs/testing';
import { PuppeteerWebPageToPdfService } from './puppeteer-web-page-to-pdf.service';

describe('PuppeteerWebPageToPdfService', () => {
  let service: PuppeteerWebPageToPdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PuppeteerWebPageToPdfService]
    }).compile();

    service = module.get<PuppeteerWebPageToPdfService>(PuppeteerWebPageToPdfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

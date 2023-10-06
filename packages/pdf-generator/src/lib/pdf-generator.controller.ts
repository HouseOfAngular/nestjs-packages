import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';
import { PuppeteerWebPageToPdfService } from './puppeteer-web-page-to-pdf/puppeteer-web-page-to-pdf.service';
import { DownloadProviderFactory, downloadProviderFactoryToken } from '@house-of-angular/nestjs-streaming';
import { URL } from 'url';
import { PdfGeneratorOptions } from './interfaces/pdf-generator-options.interface';
import { PDF_GENERATOR_OPTIONS } from './injection-tokens/pdf-generator-options.injection-token';

@Controller('pdf-generator')
export class PdfGeneratorController {
  constructor(
    @Inject(downloadProviderFactoryToken) private downloadProviderFactory: DownloadProviderFactory,
    private webPageToPdfService: PuppeteerWebPageToPdfService,
    private readonly httpAdapterHost: HttpAdapterHost,
    @Inject(PDF_GENERATOR_OPTIONS) private pdfGeneratorOptions: PdfGeneratorOptions
  ) {}

  @Get('*')
  async generatePdf(@Req() request: Request, @Res() response: Response): Promise<void> {
    const port = this.httpAdapterHost.httpAdapter.getHttpServer().address().port;
    const templateUrl = `http://localhost:${port}/${request.url.replace('/pdf-generator', '')}`;

    let headers;
    if (this.pdfGeneratorOptions.forwardHeaders) {
      headers = {} as Record<string, string>;
      for (const header of this.pdfGeneratorOptions.forwardHeaders) {
        const headerValue = request.header(header);
        if (headerValue) {
          headers[header] = headerValue;
        }
      }
    }

    const { name, stream } = await this.webPageToPdfService.toPdf(new URL(templateUrl), {
      headers: headers,
      waitFor: this.pdfGeneratorOptions.waitFor
    });

    return this.downloadProviderFactory(response).provide({
      stream: Promise.resolve(stream),
      name,
      contentType: 'application/pdf'
    });
  }
}

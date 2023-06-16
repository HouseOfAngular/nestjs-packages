import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { URL } from 'url';
import { PdfGenerationException } from '../exceptions/pdf-generation.exception';
import { ToPdfResult } from '../interfaces/to-pdf-result.interface';
import { ToPdfOptions } from '../interfaces/to-pdf-options.interface';
import {launch, HTTPRequest, HTTPResponse, TimeoutError} from "puppeteer";

@Injectable()
export class PuppeteerWebPageToPdfService {
  private static readonly timeout = 20000;

  async toPdf(url: URL, options: ToPdfOptions): Promise<ToPdfResult> {
    const browser = await launch({
      args: [
        // Disable cors checks
        '--disable-web-security',
        // Required for Docker version of Puppeteer
        '--no-sandbox',
        '--disable-setuid-sandbox',
        // This will write shared memory files into /tmp instead of /dev/shm,
        // because Docker’s default for /dev/shm is 64MB
        '--disable-dev-shm-usage'
      ]
    });
    try {
      const page = await browser.newPage();

      await page.setRequestInterception(true);
      page.on('request', (request: HTTPRequest) => {
        // Do nothing in case of non-navigation requests.
        if (!request.isNavigationRequest()) {
          request.continue();
          return;
        }
        // Add a new header for navigation request.
        let headers = request.headers();

        headers = { ...headers, ...(options.headers || {}) };
        request.continue({ headers });
      });
      const response = await page.goto(url.toString(), {
        waitUntil: 'networkidle2',
        timeout: PuppeteerWebPageToPdfService.timeout
      });
      if (!response) {
        throw new PdfGenerationException('Response not received');
      }
      await this.assertResponse(response);

      if (options.waitFor) {
        await page.waitForSelector(options.waitFor, {
          hidden: true,
          timeout: PuppeteerWebPageToPdfService.timeout
        });
      }
      const pdf: Buffer = await page.pdf({ format: 'A4', printBackground: true });
      const name = await page.title();

      return { stream: Readable.from(pdf), name: `${name}.pdf` };
    } catch (e) {
      if (e instanceof TimeoutError) {
        throw new PdfGenerationException('Pdf generation timeout');
      }
      throw e;
    } finally {
      await browser.close();
    }
  }

  private async assertResponse(response: HTTPResponse): Promise<void> {
    const statusCode = response.status();
    if (statusCode !== 200) {
      const message = (await response.json()) as string;
      throw new PdfGenerationException(message, statusCode);
    }
  }
}

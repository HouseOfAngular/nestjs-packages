import { DynamicModule, Module } from '@nestjs/common';
import { PuppeteerWebPageToPdfService } from './puppeteer-web-page-to-pdf/puppeteer-web-page-to-pdf.service';
import { PdfGeneratorController } from './pdf-generator.controller';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { DownloadExpressModule } from '@house-of-angular/nestjs-streaming';
import { PdfGeneratorOptions } from './interfaces/pdf-generator-options.interface';
import { PDF_GENERATOR_OPTIONS } from './injection-tokens/pdf-generator-options.injection-token';

@Module({
  providers: [PuppeteerWebPageToPdfService],
  controllers: [PdfGeneratorController]
})
export class PdfGeneratorModule {
  static forRoot(options: PdfGeneratorOptions): DynamicModule {
    return {
      module: PdfGeneratorModule,
      imports: [AngularUniversalModule.forRoot(options), DownloadExpressModule],
      providers: [{ provide: PDF_GENERATOR_OPTIONS, useValue: options }]
    };
  }
}

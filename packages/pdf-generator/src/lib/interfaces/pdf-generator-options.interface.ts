import { AngularUniversalOptions } from '@nestjs/ng-universal';

export interface PdfGeneratorOptions extends AngularUniversalOptions {
  /**
   * Array of names of headers forwarded to the Angular.
   */
  forwardHeaders?: string[];
  /**
   * Selector of the element that has to be invisible
   */
  waitFor?: string;
}

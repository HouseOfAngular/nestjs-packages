import { HttpStatus } from '@nestjs/common';

export class PdfGenerationException extends Error {
  constructor(message: string, public statusCode?: HttpStatus) {
    super(message);
  }
}

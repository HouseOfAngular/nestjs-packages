import { Readable } from 'stream';

export interface ToPdfResult {
  stream: Readable;
  name: string;
}

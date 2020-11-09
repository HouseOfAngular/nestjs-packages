import { StreamingParams } from './streaming-params';
import { Readable } from 'stream';

export interface StreamableResource {
  contentType: string;
  size: number;
  stream: (options?: StreamingParams) => Promise<Readable>;
}

import { Readable } from 'stream';

export interface DownloadableResource {
  contentType: string;
  name: string;
  stream: Promise<Readable>;
}

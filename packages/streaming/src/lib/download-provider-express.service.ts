import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { OutgoingHttpHeaders } from 'http';
import { DownloadableResource } from './interfaces/downloadable-resource';
import { DownloadProvider } from './ports/download.provider';

@Injectable()
export class DownloadProviderExpressService implements DownloadProvider {
  constructor(private response: Response) {}

  async provide(resource: DownloadableResource, tryToOpen = false): Promise<void> {
    const head: OutgoingHttpHeaders = {
      'Access-Control-Expose-Headers': 'Content-Disposition',
      'Content-Disposition': `${tryToOpen ? 'inline' : 'attachment'}; filename=${resource.name}`,
      'Content-Type': resource.contentType
    };
    this.response.writeHead(200, head);
    (await resource.stream).pipe(this.response);
  }
}

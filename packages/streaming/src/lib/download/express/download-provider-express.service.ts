import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { prepareHeaders } from '../shared/utils/prepare-headers';
import { DownloadableResource } from '../shared/interfaces/downloadable-resource';
import { DownloadProvider } from '../shared/interfaces/download.provider';

@Injectable()
export class DownloadProviderExpressService implements DownloadProvider {
  constructor(private response: Response) {}

  async provide(resource: DownloadableResource, tryToOpen = false): Promise<void> {
    const head = prepareHeaders(
      { fileName: resource.name, contentType: resource.contentType },
      { tryToOpen }
    );
    this.response.writeHead(200, head);
    (await resource.stream).pipe(this.response);
  }
}

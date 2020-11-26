import { Injectable } from '@nestjs/common';
import { prepareHeaders } from '../shared/utils/prepare-headers';
import { DownloadableResource } from '../shared/interfaces/downloadable-resource';
import { DownloadProvider } from '../shared/interfaces/download.provider';
import { FastifyReply } from 'fastify';

@Injectable()
export class DownloadProviderService implements DownloadProvider {
  constructor(private response: FastifyReply) {}

  async provide(resource: DownloadableResource, tryToOpen = false): Promise<void> {
    const head = prepareHeaders(
      { fileName: resource.name, contentType: resource.contentType },
      { tryToOpen }
    );
    this.response
      .code(200)
      .headers(head)
      .send(await resource.stream);
  }
}

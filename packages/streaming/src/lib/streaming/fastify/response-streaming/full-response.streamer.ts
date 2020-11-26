import { StreamableResource } from '../../../shared/interfaces/streamable-resource';
import { StreamingParams } from '../../../shared/interfaces/streaming-params';
import { FastifyReply } from 'fastify';
import { prepareHeadersForFullStreaming } from '../../shared/utils/prepare-haders.utils';
import { ResponseStreamer } from '../../shared/interfaces/response.streamer';

export class FullResponseStreamer extends ResponseStreamer {
  constructor(protected res: FastifyReply) {
    super();
  }

  async stream(
    stream: StreamableResource,
    options?: StreamingParams,
    withCache?: number
  ): Promise<void> {
    const head = prepareHeadersForFullStreaming(stream, { withCache });

    this.res
      .code(200)
      .headers(head)
      .send(await stream.stream());
  }
}

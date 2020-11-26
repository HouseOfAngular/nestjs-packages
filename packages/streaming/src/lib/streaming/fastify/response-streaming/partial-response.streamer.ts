import { StreamableResource } from '../../../shared/interfaces/streamable-resource';
import { StreamingParams } from '../../../shared/interfaces/streaming-params';
import { FastifyReply } from 'fastify';
import { prepareHeadersForPartialStreaming } from '../../shared/utils/prepare-haders.utils';
import { ResponseStreamer } from '../../shared/interfaces/response.streamer';

export class PartialResponseStreamer extends ResponseStreamer {
  constructor(protected res: FastifyReply) {
    super();
  }

  async stream(
    stream: StreamableResource,
    params: StreamingParams,
    withCache?: number
  ): Promise<void> {
    const head = prepareHeadersForPartialStreaming({ ...stream, ...params }, { withCache });
    this.res
      .code(206)
      .headers(head)
      .send(await stream.stream(params));
  }
}

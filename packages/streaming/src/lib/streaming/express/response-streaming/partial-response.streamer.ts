import { Response } from 'express';
import { StreamableResource } from '../../../shared/interfaces/streamable-resource';
import { StreamingParams } from '../../../shared/interfaces/streaming-params';
import { prepareHeadersForPartialStreaming } from '../../shared/utils/prepare-haders.utils';
import { ResponseStreamer } from '../../shared/interfaces/response.streamer';

export class PartialResponseStreamer extends ResponseStreamer {
  constructor(protected res: Response) {
    super();
  }

  async stream(
    stream: StreamableResource,
    params: StreamingParams,
    withCache?: number
  ): Promise<void> {
    const head = prepareHeadersForPartialStreaming({ ...stream, ...params }, { withCache });
    this.res.writeHead(206, head);
    (await stream.stream(params)).pipe(this.res);
  }
}

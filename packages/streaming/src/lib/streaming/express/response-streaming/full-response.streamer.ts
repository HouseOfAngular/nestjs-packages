import { Response } from 'express';
import { StreamableResource } from '../../../shared/interfaces/streamable-resource';
import { StreamingParams } from '../../../shared/interfaces/streaming-params';
import { prepareHeadersForFullStreaming } from '../../shared/utils/prepare-haders.utils';
import { ResponseStreamer } from '../../shared/interfaces/response.streamer';

export class FullResponseStreamer extends ResponseStreamer {
  constructor(protected res: Response) {
    super();
  }

  async stream(
    stream: StreamableResource,
    options?: StreamingParams,
    withCache?: number
  ): Promise<void> {
    const head = prepareHeadersForFullStreaming(stream, { withCache });
    this.res.writeHead(200, head);
    (await stream.stream()).pipe(this.res);
  }
}

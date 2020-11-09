import { Response } from 'express';
import { OutgoingHttpHeaders } from 'http';
import { StreamableResource } from '../../shared/interfaces/streamable-resource';
import { ResponseStreamer } from '../../streaming/interfaces/response.streamer';
import { StreamingParams } from '../../shared/interfaces/streaming-params';

export class FullResponseStreamer extends ResponseStreamer {
  constructor(protected res: Response) {
    super();
  }

  async stream(
    stream: StreamableResource,
    options?: StreamingParams,
    withCache?: number
  ): Promise<void> {
    let head: OutgoingHttpHeaders = {
      ...(stream.size ? { 'Content-Length': stream.size } : null),
      ...(stream.contentType ? { 'Content-Type': stream.contentType } : null)
    };
    if (withCache) {
      head = {
        ...head,
        'Cache-Control': `max-age=${withCache}, public`,
        Expires: new Date(new Date().getDate() + withCache).toDateString()
      };
    }
    this.res.writeHead(200, head);
    (await stream.stream()).pipe(this.res);
  }
}

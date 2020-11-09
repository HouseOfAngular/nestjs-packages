import { Response } from 'express';
import { OutgoingHttpHeaders } from 'http';
import { ResponseStreamer } from '../interfaces/response.streamer';
import { StreamableResource } from '../../shared/interfaces/streamable-resource';
import { StreamingParams } from '../../shared/interfaces/streaming-params';

export class PartialResponseStreamer extends ResponseStreamer {
  constructor(protected res: Response) {
    super();
  }

  async stream(
    stream: StreamableResource,
    params: StreamingParams,
    withCache?: number
  ): Promise<void> {
    const end = params.end || stream.size - 1;
    let head: OutgoingHttpHeaders = {
      'Content-Range': `bytes ${params.start}-${end}/${stream.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Type': stream.contentType
    };
    if (withCache) {
      head = {
        ...head,
        'Cache-Control': `max-age=${withCache}, public`,
        Expires: new Date(new Date().getDate() + withCache).toDateString()
      };
    }
    this.res.writeHead(206, head);
    (await stream.stream(params)).pipe(this.res);
  }
}

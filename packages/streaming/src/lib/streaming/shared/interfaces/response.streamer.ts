import { StreamableResource } from '../../../shared/interfaces/streamable-resource';
import { StreamingParams } from '../../../shared/interfaces/streaming-params';

export abstract class ResponseStreamer {
  abstract stream(
    stream: StreamableResource,
    params?: StreamingParams,
    withCache?: number
  ): Promise<void>;
}

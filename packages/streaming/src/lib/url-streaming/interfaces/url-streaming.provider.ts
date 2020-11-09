import { StreamableResource } from '../../shared/interfaces/streamable-resource';

export abstract class UrlStreamingProvider {
  abstract getStream(url: string): Promise<StreamableResource>;
}

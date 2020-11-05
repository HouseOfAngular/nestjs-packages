import { DownloadableResource } from '../interfaces/downloadable-resource';

export abstract class DownloadProvider {
  /**
   * Prepare response to give the possibility of downloading stream data
   */
  abstract provide(resource: DownloadableResource, tryToOpen?: boolean): Promise<void>;
}

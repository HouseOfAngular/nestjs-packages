import { Injectable } from '@nestjs/common';
import * as https from 'https';
import { UrlStreamingProvider } from '../interfaces/url-streaming.provider';
import { StreamableResource } from '../../shared/interfaces/streamable-resource';

@Injectable()
export class NativeUrlStreamerProvider extends UrlStreamingProvider {
  getStream(url: string): Promise<StreamableResource> {
    return new Promise((resolve, reject) => {
      https.get(url, response => {
        if (
          !response.statusCode ||
          response.statusCode > 300 ||
          !response.headers['content-length'] ||
          !response.headers['content-type']
        ) {
          reject();
        } else {
          resolve({
            size: +response.headers['content-length'],
            contentType: response.headers['content-type'],
            stream: () => Promise.resolve(response)
          });
        }
      });
    });
  }
}

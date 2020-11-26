import { NotImplementedException } from '@nestjs/common';
import { FullResponseStreamer } from './full-response.streamer';
import { PartialResponseStreamer } from './partial-response.streamer';
import { StreamingType } from '../../shared/interfaces/streaming-type';
import { ResponseStreamerFactory } from '../../shared/interfaces/response-streamer.factory';

export const responseStreamerFactory: ResponseStreamerFactory = (type: StreamingType, res: any) => {
  let exhaustCheck: never;
  switch (type) {
    case StreamingType.Full:
      return new FullResponseStreamer(res);
    case StreamingType.Partial:
      return new PartialResponseStreamer(res);
    default:
      exhaustCheck = type;
      throw new NotImplementedException(`Streamer for streaming type ${type} is not implemented`);
  }
};

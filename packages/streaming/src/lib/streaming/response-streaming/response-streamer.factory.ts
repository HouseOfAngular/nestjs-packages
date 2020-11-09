import { NotImplementedException } from '@nestjs/common';
import { Response } from 'express';
import { FullResponseStreamer } from './full-response.streamer';
import { PartialResponseStreamer } from './partial-response.streamer';
import { StreamingType } from './streaming-type';
import { ResponseStreamer } from '../interfaces/response.streamer';

export const responseStreamerFactoryToken = Symbol('responseStreamerFactoryToken');

export type ResponseStreamerFactory = (type: StreamingType, res: Response) => ResponseStreamer;

export const responseStreamerFactory: ResponseStreamerFactory = (
  type: StreamingType,
  res: Response
) => {
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

import { FastifyReply } from 'fastify';
import { StreamingType } from './streaming-type';
import { Response } from 'express';
import { ResponseStreamer } from './response.streamer';

export const responseStreamerFactoryToken = Symbol('responseStreamerFactoryToken');

export interface ResponseStreamerFactory {
  (type: StreamingType, res: FastifyReply | Response): ResponseStreamer;
}

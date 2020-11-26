import { Response } from 'express';
import { DownloadProvider } from './download.provider';
import { FastifyReply } from 'fastify';

export const downloadProviderFactoryToken = Symbol('downloadProviderFactoryToken');

export type DownloadProviderFactory = (res: Response | FastifyReply) => DownloadProvider;

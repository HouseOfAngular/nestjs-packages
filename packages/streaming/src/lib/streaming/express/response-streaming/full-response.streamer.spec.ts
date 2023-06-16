import { ObjectReadableMock, ObjectWritableMock } from 'stream-mock';
import { FullResponseStreamer } from './full-response.streamer';

describe('FullResponseStreamer', () => {
  const streamData = [0, 0, 0, 0];

  describe('#stream', () => {
    test('set headers and streams', async () => {
      const res: any = new ObjectWritableMock();
      res.writeHead = jest.fn();
      const streamer = new FullResponseStreamer(res);
      const stream = jest.fn();

      stream.mockImplementation(() => new ObjectReadableMock(streamData));
      await streamer.stream({ size: 2048, contentType: 'video/mp4', stream });

      expect(res.writeHead).toHaveBeenCalledWith(200, {
        'Content-Length': 2048,
        'Content-Type': 'video/mp4'
      });
      expect(stream).toHaveBeenCalledWith();

      res.on('finish', () => {
        expect(res.data).toEqual(streamData);
      });
    });

    test('set headers and streams with cache', async () => {
      const res: any = new ObjectWritableMock();
      res.writeHead = jest.fn();
      const streamer = new FullResponseStreamer(res);
      const stream = jest.fn();

      stream.mockImplementation(() => new ObjectReadableMock(streamData));
      await streamer.stream({ size: 2048, contentType: 'video/mp4', stream }, undefined, 2592000);

      expect(res.writeHead).toHaveBeenCalledWith(200, {
        'Content-Length': 2048,
        'Content-Type': 'video/mp4',
        'Cache-Control': `max-age=2592000, public`,
        Expires: new Date(new Date().getDate() + 2592000).toDateString()
      });
      expect(stream).toHaveBeenCalledWith();

      res.on('finish', () => {
        expect(res.data).toEqual(streamData);
      });
    });
  });
});

import { ObjectReadableMock, ObjectWritableMock } from 'stream-mock';
import { PartialResponseStreamer } from './partial-response.streamer';

describe('PartialResponseStreamer', () => {
  const streamData = [0, 0, 0, 0];

  describe('#stream', () => {
    test('streams with end option', async () => {
      const res: any = new ObjectWritableMock();
      res.writeHead = jest.fn();
      const streamer = new PartialResponseStreamer(res);
      const params = { start: 100, end: 200 };
      const stream = jest.fn();

      stream.mockImplementation(() => new ObjectReadableMock(streamData));
      await streamer.stream({ size: 2048, contentType: 'video/mp4', stream }, params);

      expect(res.writeHead).toHaveBeenCalledWith(206, {
        'Accept-Ranges': 'bytes',
        'Content-Range': 'bytes 100-200/2048',
        'Content-Type': 'video/mp4'
      });
      expect(stream).toHaveBeenCalledWith(params);

      res.on('finish', () => {
        expect(res.data).toEqual(streamData);
      });
    });

    test('streams without end option', async () => {
      const res: any = new ObjectWritableMock();
      res.writeHead = jest.fn();
      const streamer = new PartialResponseStreamer(res);
      const params = { start: 100 };
      const stream = jest.fn();

      stream.mockImplementation(() => new ObjectReadableMock(streamData));
      await streamer.stream({ size: 2048, contentType: 'video/mp4', stream }, params);

      expect(res.writeHead).toHaveBeenCalledWith(206, {
        'Accept-Ranges': 'bytes',
        'Content-Range': 'bytes 100-2047/2048',
        'Content-Type': 'video/mp4'
      });
      expect(stream).toHaveBeenCalledWith(params);

      res.on('finish', () => {
        expect(res.data).toEqual(streamData);
      });
    });

    test('streams with cache', async () => {
      const res: any = new ObjectWritableMock();
      res.writeHead = jest.fn();
      const streamer = new PartialResponseStreamer(res);
      const params = { start: 100 };
      const stream = jest.fn();

      stream.mockImplementation(() => new ObjectReadableMock(streamData));
      await streamer.stream({ size: 2048, contentType: 'video/mp4', stream }, params, 2592000);

      expect(res.writeHead).toHaveBeenCalledWith(206, {
        'Accept-Ranges': 'bytes',
        'Content-Range': 'bytes 100-2047/2048',
        'Content-Type': 'video/mp4',
        'Cache-Control': `max-age=2592000, public`,
        Expires: new Date(new Date().getDate() + 2592000).toDateString()
      });
      expect(stream).toHaveBeenCalledWith(params);

      res.on('finish', () => {
        expect(res.data).toEqual(streamData);
      });
    });
  });
});

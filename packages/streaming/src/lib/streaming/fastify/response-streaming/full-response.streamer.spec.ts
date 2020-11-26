import { FullResponseStreamer } from './full-response.streamer';

describe('FullResponseStreamer', () => {
  describe('#stream', () => {
    test('set headers and streams', async () => {
      const result = {};
      const res: any = { headers: jest.fn(() => res), code: jest.fn(() => res), send: jest.fn() };
      const streamer = new FullResponseStreamer(res);
      const stream = jest.fn();

      stream.mockImplementation(() => result);
      await streamer.stream({ size: 2048, contentType: 'video/mp4', stream });

      expect(res.code).toHaveBeenCalledWith(200);
      expect(res.headers).toHaveBeenCalledWith({
        'Content-Length': 2048,
        'Content-Type': 'video/mp4'
      });
      expect(stream).toHaveBeenCalledWith();
      expect(res.send).toHaveBeenCalledWith(result);
    });

    test('set headers and streams with cache', async () => {
      const result = {};
      const res: any = { headers: jest.fn(() => res), code: jest.fn(() => res), send: jest.fn() };
      const streamer = new FullResponseStreamer(res);
      const stream = jest.fn();

      stream.mockImplementation(() => result);
      await streamer.stream({ size: 2048, contentType: 'video/mp4', stream }, undefined, 2592000);

      expect(res.code).toHaveBeenCalledWith(200);
      expect(res.headers).toHaveBeenCalledWith({
        'Content-Length': 2048,
        'Content-Type': 'video/mp4',
        'Cache-Control': `max-age=2592000, public`,
        Expires: new Date(new Date().getDate() + 2592000).toDateString()
      });
      expect(stream).toHaveBeenCalledWith();
      expect(res.send).toHaveBeenCalledWith(result);
    });
  });
});

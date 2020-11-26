import { PartialResponseStreamer } from './partial-response.streamer';

describe('PartialResponseStreamer', () => {
  describe('#stream', () => {
    test('streams with end option', async () => {
      const result = {};
      const res: any = { headers: jest.fn(() => res), code: jest.fn(() => res), send: jest.fn() };
      const streamer = new PartialResponseStreamer(res);
      const params = { start: 100, end: 200 };
      const stream = jest.fn();

      stream.mockImplementation(() => result);
      await streamer.stream({ size: 2048, contentType: 'video/mp4', stream }, params);

      expect(res.code).toHaveBeenCalledWith(206);
      expect(res.headers).toHaveBeenCalledWith({
        'Accept-Ranges': 'bytes',
        'Content-Range': 'bytes 100-200/2048',
        'Content-Type': 'video/mp4'
      });
      expect(stream).toHaveBeenCalledWith(params);
      expect(res.send).toHaveBeenCalledWith(result);
    });

    test('streams without end option', async () => {
      const result = {};
      const res: any = { headers: jest.fn(() => res), code: jest.fn(() => res), send: jest.fn() };
      const streamer = new PartialResponseStreamer(res);
      const params = { start: 100 };
      const stream = jest.fn();

      stream.mockImplementation(() => result);
      await streamer.stream({ size: 2048, contentType: 'video/mp4', stream }, params);

      expect(res.code).toHaveBeenCalledWith(206);
      expect(res.headers).toHaveBeenCalledWith({
        'Accept-Ranges': 'bytes',
        'Content-Range': 'bytes 100-2047/2048',
        'Content-Type': 'video/mp4'
      });
      expect(stream).toHaveBeenCalledWith(params);
      expect(res.send).toHaveBeenCalledWith(result);
    });

    test('streams with cache', async () => {
      const result = {};
      const res: any = { headers: jest.fn(() => res), code: jest.fn(() => res), send: jest.fn() };
      const streamer = new PartialResponseStreamer(res);
      const params = { start: 100 };
      const stream = jest.fn();

      stream.mockImplementation(() => result);
      await streamer.stream({ size: 2048, contentType: 'video/mp4', stream }, params, 2592000);

      expect(res.code).toHaveBeenCalledWith(206);
      expect(res.headers).toHaveBeenCalledWith({
        'Accept-Ranges': 'bytes',
        'Content-Range': 'bytes 100-2047/2048',
        'Content-Type': 'video/mp4',
        'Cache-Control': `max-age=2592000, public`,
        Expires: new Date(new Date().getDate() + 2592000).toDateString()
      });
      expect(stream).toHaveBeenCalledWith(params);
      expect(res.send).toHaveBeenCalledWith(result);
    });
  });
});

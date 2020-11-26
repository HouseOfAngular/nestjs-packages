import { OutgoingHttpHeaders } from 'http';

const prepareDefaultStreamingHeaders = (
  params: { contentType: string },
  options?: { withCache?: number }
): OutgoingHttpHeaders => {
  let head: OutgoingHttpHeaders = {
    'Content-Type': params.contentType
  };
  if (options?.withCache) {
    head = {
      ...head,
      'Cache-Control': `max-age=${options.withCache}, public`,
      Expires: new Date(new Date().getDate() + options.withCache).toDateString()
    };
  }

  return head;
};
export const prepareHeadersForFullStreaming = (
  params: { size: number; contentType: string },
  options?: { withCache?: number }
): OutgoingHttpHeaders => {
  const head = prepareDefaultStreamingHeaders(params, options);
  return { ...head, 'Content-Length': params.size };
};

export const prepareHeadersForPartialStreaming = (
  params: { size: number; start: number; end?: number; contentType: string },
  options: { withCache?: number }
): OutgoingHttpHeaders => {
  const head = prepareDefaultStreamingHeaders(params, options);

  const end = params.end || params.size - 1;
  return {
    ...head,
    'Content-Range': `bytes ${params.start}-${end}/${params.size}`,
    'Accept-Ranges': 'bytes'
  };
};

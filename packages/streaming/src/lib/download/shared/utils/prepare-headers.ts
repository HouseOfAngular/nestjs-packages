import { OutgoingHttpHeaders } from 'http';

export const prepareHeaders = (
  params: { fileName: string; contentType: string },
  options?: { tryToOpen?: boolean }
): OutgoingHttpHeaders => {
  return {
    'Access-Control-Expose-Headers': 'Content-Disposition',
    'Content-Disposition': `${options?.tryToOpen ? 'inline' : 'attachment'}; filename=${
      params.fileName
    }`,
    'Content-Type': params.contentType
  };
};

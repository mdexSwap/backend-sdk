import * as fleekStorage from '@fleekhq/fleek-storage-js';

export const upLoadFile = async ({
  stream,
  key,
}: {
  stream: Buffer;
  key: string;
}): Promise<void> => {
  await fleekStorage.streamUpload({
    apiKey: process.env.FLEEK_API_KEY,
    apiSecret: process.env.FLEEK_API_SECRET,
    key,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    stream,
  });
};

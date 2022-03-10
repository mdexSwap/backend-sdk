import { Transform } from 'class-transformer';

export const ConvertFileUrl = (key: string) => {
  return Transform(
    (_value, obj) => ({
      path: obj?.[key],
      url: `${process.env.FLEEK_PATH}${obj?.[key]}`,
    }),
    {
      toClassOnly: true,
    },
  );
};

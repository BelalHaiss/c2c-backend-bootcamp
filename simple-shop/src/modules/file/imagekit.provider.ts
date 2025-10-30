import ImageKit from '@imagekit/nodejs';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from 'src/types/declartion-mergin';

export const imageKitToken = 'ImageKitProvider';
export const ImageKitProvider = {
  provide: imageKitToken,
  useFactory: (configService: ConfigService<EnvVariables>) => {
    return new ImageKit({
      privateKey: configService.getOrThrow('IMAGEKIT_SECRET_KEY'),
    });
  },
  inject: [ConfigService],
};

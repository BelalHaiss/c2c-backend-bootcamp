import { getEnvOrThrow } from '../utils/util';

export const isProduction = getEnvOrThrow('NODE_ENV') === 'production';

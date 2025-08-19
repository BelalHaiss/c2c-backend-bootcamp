import { ZodError, ZodType } from 'zod';
import { CustomError } from './exception';
import { ModuleNameType } from './constant';
import { HttpErrorStatus } from './util.types';

export const zodValidation = <T>(
  schema: ZodType<T>,
  payload: T,
  moduleName: ModuleNameType
) => {
  try {
    const safeData = schema.parse(payload);
    return safeData;
  } catch (error) {
    if (error instanceof ZodError) {
      throw new CustomError(
        error.message,
        moduleName,
        HttpErrorStatus.BadRequest
      );
    }

    throw error;
  }
};

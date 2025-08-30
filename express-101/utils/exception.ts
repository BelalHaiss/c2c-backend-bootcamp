import type { Response } from 'express';
import { ModuleNameType } from './constant';
import { ErrorStatusCode } from './util.types';
export class CustomError extends Error {
  public errorType = 'custom';
  constructor(
    msg: string,
    public moduleName: ModuleNameType,
    public statusCode: ErrorStatusCode
  ) {
    super(msg);
  }
}

export const handleError = (error: unknown, res: Response) => {
  if (error instanceof CustomError) {
    console.log('customError', error);
    res.error({ message: error.message, statusCode: error.statusCode });
    return;
  }
  console.log(`internal server error`, error);
  //   we should alert ourself
  res.error({ message: 'internal server error', statusCode: 500 });
};

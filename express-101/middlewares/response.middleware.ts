import { RequestHandler } from 'express';
import { ErrorStatusCode } from '../utils/util.types';

export type UnifiedApiErrorResponse = {
  statusCode: ErrorStatusCode;
  message: string;
};

export type SuccessApiResponse = {
  success: true;
  data: object;
};

export type UnsuccessfulApiResponse = {
  success: false;
  error: UnifiedApiErrorResponse;
};

export type UnifiedApiResponse = SuccessApiResponse | UnsuccessfulApiResponse;

export const responseEnhancer: RequestHandler = (req, res, next) => {
  res.ok = (data) =>
    res.status(200).json(formatUnifiedResponse({ success: true, data }));

  res.create = (data) =>
    res.status(201).json(formatUnifiedResponse({ success: true, data }));

  res.error = (err) =>
    res
      .status(err.statusCode)
      .json(formatUnifiedResponse({ success: false, error: err }));

  next();
};

const formatUnifiedResponse = (res: UnifiedApiResponse) => res;

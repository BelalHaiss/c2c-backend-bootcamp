// limit & totalRecords => pagination meta

import { PaginationMeta } from '../middlewares/response.middleware';

export type CalculatePaginationMetaParams = {
  page: number;
  limit: number;
  totalRecords: number;
};
export const calculatePaginationMeta = ({
  page,
  limit,
  totalRecords
}: CalculatePaginationMetaParams): PaginationMeta => {
  const totalPages = Math.ceil(totalRecords / limit);
  return {
    page,
    limit,
    totalRecords,
    totalPages
  };
};

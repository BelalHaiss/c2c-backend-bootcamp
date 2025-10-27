import { PaginationQueryType } from 'src/types/util.types';

export type ProductQuery = PaginationQueryType & { name?: string };

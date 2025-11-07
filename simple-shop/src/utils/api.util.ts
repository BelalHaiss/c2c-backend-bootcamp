import { PaginationQueryType } from 'src/types/util.types';
import z, { ZodType } from 'zod';

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
}) satisfies ZodType<PaginationQueryType>;

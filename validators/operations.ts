import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from '../services/openapi/registry';

extendZodWithOpenApi(z);

export const ZOperation = z.object({
  name: z.string().min(1).max(100),
  type: z.string().min(1).max(100),
  categories: z.array(z.string().min(1).max(100)),
  locationId: z.optional(z.string().min(1))
});
export type ZOperation = z.infer<typeof ZOperation>;

export const OperationSchema = registry.register('Operation', ZOperation.openapi('Operation'));
export const OperationSchemaWithID = registry.register(
  'OperationWID',
  ZOperation.extend({
    _id: z.string().uuid()
  }).openapi('OperationWID')
);

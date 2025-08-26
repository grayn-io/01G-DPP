import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from '../services/openapi/registry';

extendZodWithOpenApi(z);

export const ZLocation = z.object({
  name: z.string().min(2),
  type: z.string().min(2),
  address: z.string().min(1).max(100),
  postCode: z.string().min(1).max(20),
  city: z.string().min(1).max(100),
  country: z.string().min(1).max(100)
});
export type ZLocation = z.infer<typeof ZLocation>;

export const LocationSchema = registry.register('Location', ZLocation.openapi('Location'));
export const LocationSchemaWithID = registry.register(
  'LocationWID',
  ZLocation.extend({
    _id: z.string().uuid()
  }).openapi('LocationWID')
);

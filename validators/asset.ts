import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from '../services/openapi/registry';

extendZodWithOpenApi(z);

export const ZAsset = z.object({
  name: z.string().min(1).max(100),
  type: z.string().min(1).max(100),
  energySource: z.string().min(2).max(100),
  fuelTypes: z.array(z.string().min(1).max(100)),
  locationId: z.optional(z.string().min(1))
});
export type ZAsset = z.infer<typeof ZAsset>;

export const AssetSchema = registry.register('Asset', ZAsset.openapi('Asset'));
export const AssetSchemaWithID = registry.register(
  'AssetWID',
  ZAsset.extend({
    _id: z.string().uuid()
  }).openapi('AssetWID')
);

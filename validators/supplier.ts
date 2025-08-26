import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { ZContact } from './contact';
import { States } from '../util/types';
import { registry } from '../services/openapi/registry';
extendZodWithOpenApi(z);

export const ZSupplier = z.object({
  name: z.optional(z.string().min(1).max(250)),
  status: z.optional(z.nativeEnum(States)),
  taxIdNumber: z.optional(z.string().min(1).max(20)),
  email: z.optional(z.string().email().min(5).max(100)),
  phone: z.optional(z.string().min(4).max(20)),
  phoneCountryCode: z.optional(z.string().min(2).max(10)),
  webpage: z.optional(z.string().min(3).max(250)),
  address: z.optional(z.string().min(1).max(100)),
  postCode: z.optional(z.string().min(1).max(20)),
  city: z.optional(z.string().min(1).max(100)),
  country: z.optional(z.string().min(1).max(100)),
  contact: z.array(ZContact),
  description: z.optional(z.string().min(5)),
  industry: z.optional(z.string().min(1).max(100))
});
export type ZSupplier = z.infer<typeof ZSupplier>;

export const SupplierSchema = registry.register('Supplier', ZSupplier.openapi('Supplier'));
export const SupplierSchemaWithID = registry.register(
  'SupplierWID',
  ZSupplier.extend({
    _id: z.string().uuid()
  }).openapi('SupplierWID')
);

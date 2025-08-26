import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from '../services/openapi/registry';
import { States } from '../util/types';

extendZodWithOpenApi(z);

export const ZCompany = z.object({
  name: z.string().min(2),
  status: z.optional(z.nativeEnum(States)),
  taxIdNumber: z.optional(z.string().max(20)),
  email: z.optional(z.string().email().min(5).max(100)),
  phone: z.optional(z.string().min(4).max(20)),
  phoneCountryCode: z.optional(z.string().min(2).max(10)),
  webpage: z.optional(z.string().min(3).max(250)),
  address: z.optional(z.string().min(1).max(100)),
  postCode: z.optional(z.string().min(1).max(20)),
  city: z.optional(z.string().min(1).max(100)),
  country: z.optional(z.string().min(1).max(100)),
  size: z.optional(z.number()),
  industry: z.optional(z.string().min(1).max(100))
});
export type ZCompany = z.infer<typeof ZCompany>;

export const CompanySchema = registry.register('Company', ZCompany.openapi('Company'));
export const CompanySchemaWithID = registry.register(
  'CompanyWID',
  ZCompany.extend({
    _id: z.string().uuid()
  }).openapi('CompanyWID')
);

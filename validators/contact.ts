import { registry } from '../services/openapi/registry';
import { z } from 'zod';
import { States } from '../util/types';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
extendZodWithOpenApi(z);

export const ZContact = z.object({
  firstName: z.optional(z.string().min(1).max(100)),
  lastName: z.optional(z.string().min(1).max(100)),
  status: z.optional(z.nativeEnum(States)),
  email: z.optional(z.string().email().min(5).max(100)),
  phone: z.optional(z.number().gte(1000).lte(99999999999)),
  phoneCountryCode: z.optional(z.string().min(2).max(10))
});
export type ZContact = z.infer<typeof ZContact>;

export const ContactSchema = registry.register('Contact', ZContact.openapi('Contact'));
export const ContactSchemaWithID = registry.register(
  'ContactWID',
  ZContact.extend({
    _id: z.string().length(24)
  }).openapi('ContactWID')
);

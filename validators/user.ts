import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { AccessRoles } from '../util/types';

extendZodWithOpenApi(z);

export const ZContractFavourite = z.object({
  contractId: z.string().min(2)
});
export type ZContractFavourite = z.infer<typeof ZContractFavourite>;

export const ZContractNote = z.object({
  contractId: z.string().min(2),
  text: z.string().min(2)
});
export type ZContractNote = z.infer<typeof ZContractNote>;

export const ZUser = z.object({
  firstName: z.optional(z.string().min(1).max(100)),
  lastName: z.optional(z.string().min(1).max(100)),
  password: z.optional(z.string().min(2)),
  department: z.optional(z.string().min(1).max(100)),
  jobTitle: z.optional(z.string().min(1).max(100)),
  email: z.string().email().min(5).max(100),
  phoneNumber: z.optional(z.number()),
  phoneCountryCode: z.optional(z.string().min(2).max(10)),
  role: z.optional(z.nativeEnum(AccessRoles))
});
export type ZUser = z.infer<typeof ZUser>;

export const UserLoginSchema = z
  .object({
    username: z.string().email().min(5).max(100),
    password: z.string().min(2).openapi({ example: '********' })
  })
  .openapi('UserLogin');

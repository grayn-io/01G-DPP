import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { CircularityMetrics, States } from '../util/types';
import { ZContact } from './contact';
import { registry } from '../services/openapi/registry';
extendZodWithOpenApi(z);

export const ZContractAmount = z.object({
  from: z.optional(z.number().min(0)).openapi({ example: 0 }),
  to: z.optional(z.number().min(0)).openapi({ example: 1000 }),
  currency: z.optional(z.string().min(1).max(30)).openapi({ example: 'NOK' }),
  taxIncluded: z.optional(z.boolean()),
  description: z.optional(z.string().min(1).max(1000))
});
export type ZContractAmount = z.infer<typeof ZContractAmount>;

export const ZContractSupplier = z.object({
  supplier: z.optional(z.string().min(2)),
  useSupplierContact: z.optional(z.boolean()),
  contacts: z.array(ZContact),
  info: z.optional(z.string().min(2))
});
export type ZContractSupplier = z.infer<typeof ZContractSupplier>;

export const ZContract = z.object({
  name: z.optional(z.string().min(1).max(250).openapi({ example: 'Agreement' })),
  status: z.optional(z.nativeEnum(States)),
  type: z.optional(z.string().min(1).max(100)),
  circularity: z.array(z.nativeEnum(CircularityMetrics)),
  valid: z.optional(
    z.object({
      fromDate: z.optional(z.date().openapi({ example: '01.01.2020' })),
      toDate: z.optional(z.date().openapi({ example: '01.01.2035' }))
    })
  ),
  department: z.array(z.string().min(1).max(250)),
  scope: z.optional(
    z.object({
      mainCategory: z.array(z.string().min(1).max(100)),
      subCategory: z.array(z.string().min(1).max(100)),
      product: z.array(z.string().min(1).max(100))
    })
  ),
  orderAmount: z.optional(ZContractAmount),
  description: z.optional(z.string().min(1).max(5000)),
  // suppliers: z.array(ZContractSupplier),
  managers: z.array(z.string().min(1).max(100)),
  bonuses: z.array(z.string().min(1).max(100)),
  additionalInformation: z.array(
    z.object({
      title: z.optional(z.string().min(1).max(250)).openapi({ example: 'Title' }),
      text: z.optional(z.string().min(1).max(1000)).openapi({ example: 'Information' })
    })
  ),
  alternativeContracts: z.array(z.string().min(2))
});
export type ZContract = z.infer<typeof ZContract>;

export const ContractSchema = registry.register('Contract', ZContract.openapi('Contract'));
export const ContractSchemaWithID = registry.register(
  'ContractWID',
  ZContract.extend({
    _id: z.string().uuid()
  }).openapi('ContractWID')
);

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { registry } from '../services/openapi/registry';
import { Consumptions } from '../util/types';

extendZodWithOpenApi(z);

export const ZRelations = z.object({
  businessUnitIds: z.array(z.string().min(1).max(100)),
  assetIds: z.array(z.string().min(1).max(100))
});
export type ZRelations = z.infer<typeof ZRelations>;

export const ZConsumptionData = z.object({
  periodStart: z.string().min(1).max(100),
  periodEnd: z.string().min(1).max(100),
  value: z.optional(z.number()),
  kilometers: z.optional(z.number()),
  unit: z.optional(z.string().min(1).max(20)),
  type: z.optional(z.string().min(1).max(100)),
  numberOfPeople: z.optional(z.number()),
  destinationFrom: z.optional(z.string().min(1).max(100)),
  destinationTo: z.optional(z.string().min(1).max(100))
});
export type ZConsumptionData = z.infer<typeof ZConsumptionData>;

export const ZConsumption = z.object({
  type: z.nativeEnum(Consumptions),
  state: z.string().min(1).max(100),
  relations: ZRelations,
  locationId: z.optional(z.string().min(1).max(100)),
  typeData: z.optional(
    z.object({
      assetId: z.optional(z.string().min(1).max(100)),
      energySource: z.optional(z.string().min(1).max(100)),
      transportType: z.optional(z.string().min(1).max(100))
    })
  ),
  data: z.array(ZConsumptionData)
});
export type ZConsumption = z.infer<typeof ZConsumption>;

export const ConsumptionSchema = registry.register(
  'Consumption',
  ZConsumption.openapi('Consumption')
);
export const ConsumptionSchemaWithID = registry.register(
  'ConsumptionWID',
  ZConsumption.extend({
    _id: z.string().length(24)
  }).openapi('ConsumptionWID')
);

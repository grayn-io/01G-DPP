import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const verifyEmailSchema = z.object({
  emailB64: z.string().openapi({
    example: 'dXNlckBleGFtcGxlLmNvbQ==',
    description: 'Base64url encoded email address'
  }),
  signatureB64: z.string().openapi({
    example: '28U-lfhERshm1KOoSJo7dDNlJ2z_d9QdVV6Dkj1KspOBIIj-NsphdyoDJ+hauJyv',
    description: 'Base64url encoded signature'
  }),
  validTo: z.number().openapi({
    example: 1689333797456,
    description:
      'Date.now() + EMAIL_VALID_SECONDS //when generated. Will only validate if gt Date.now(). If manipulated, signature will fail.'
  })
});

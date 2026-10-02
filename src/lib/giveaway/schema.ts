import { z } from 'zod';
export const campaign = 'halloween-pump-2026';
export const cities = ['Maricopa', 'Queen Creek', 'San Tan Valley', 'Florence', 'Coolidge'] as const;
export const maintenanceOptions = ['Pool service company', 'I maintain it myself', 'No regular service'] as const;
export const interestOptions = ['Monthly pool service', 'Pool repair', 'Equipment upgrade', 'Mainly here for the giveaway'] as const;
const text = z.string().trim().min(1, 'This field is required.').max(160);
export const entrySchema = z.object({
  firstName: text.max(80), lastName: text.max(80),
  phone: z.string().transform(v => v.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, ''))
    .pipe(z.string().regex(/^[2-9]\d{2}[2-9]\d{6}$/, 'Enter a valid US mobile number.')),
  email: z.string().trim().toLowerCase().email().max(254),
  address: text.min(5), city: z.enum(cities), zip: z.string().trim().regex(/^\d{5}$/, 'Enter a five-digit ZIP.'),
  ownsHome: z.enum(['Yes', 'No']), maintenance: z.enum(maintenanceOptions),
  equipmentIssues: z.enum(['Yes', 'No', 'Not sure']), interest: z.enum(interestOptions),
  rulesConsent: z.literal(true), contactConsent: z.literal(true), website: z.string().max(0).optional(),
  utm_source: z.string().max(200).optional(), utm_medium: z.string().max(200).optional(),
  utm_campaign: z.string().max(200).optional(), utm_content: z.string().max(200).optional(),
});
export const submissionSchema = entrySchema.extend({
  submissionToken: z.string().regex(/^[a-f0-9]{64}$/, 'Please reload the form and try again.'),
});

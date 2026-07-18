import { z } from 'zod';

import { campaignInterests } from './campaign';

export const leadFieldNames = ['firstName', 'lastName', 'email', 'phone', 'city', 'interests'] as const;

export type LeadFieldName = (typeof leadFieldNames)[number];
export type LeadFieldErrors = Partial<Record<LeadFieldName, string>>;

const emptyStringToUndefined = (value: unknown) =>
  typeof value === 'string' && value.trim() === '' ? undefined : value;

export function getNorthAmericanPhoneDigits(value: string) {
  const digits = value.replace(/\D/g, '');

  if (digits.length === 10) return digits;
  if (digits.length === 11 && digits.startsWith('1')) return digits.slice(1);
  return null;
}

export function formatNorthAmericanPhone(value: string) {
  const digits = getNorthAmericanPhoneDigits(value);
  if (!digits) return value.trim();
  return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function formatNorthAmericanPhoneInput(value: string) {
  const rawDigits = value.replace(/\D/g, '');
  const nationalDigits = rawDigits.startsWith('1') ? rawDigits.slice(1) : rawDigits;
  const digits = nationalDigits.slice(0, 10);

  if (!digits) return '';
  if (digits.length <= 3) return `+1 (${digits}`;
  if (digits.length <= 6) return `+1 (${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export const leadSubmissionSchema = z.strictObject({
  campaign: z.literal('weekend'),
  firstName: z.string().trim().min(1, 'First name is required.').max(80),
  lastName: z.string().trim().min(1, 'Last name is required.').max(80),
  email: z.email('Enter a valid email address.').trim().toLowerCase().max(160),
  phone: z.preprocess(
    emptyStringToUndefined,
    z
      .string()
      .trim()
      .max(40)
      .refine((value) => getNorthAmericanPhoneDigits(value) !== null, {
        error: 'Enter a valid US or Canadian phone number.',
      })
      .transform(formatNorthAmericanPhone)
      .optional(),
  ),
  city: z.string().trim().min(2, 'City must be at least 2 characters.').max(100),
  interests: z.array(z.enum(campaignInterests)).max(4).default([]),
  website: z.string().trim().max(300).optional().default(''),
});

export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;

export function getLeadFieldErrors(error: z.ZodError): LeadFieldErrors {
  const fieldErrors: LeadFieldErrors = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    if (
      typeof field === 'string' &&
      leadFieldNames.includes(field as LeadFieldName) &&
      !fieldErrors[field as LeadFieldName]
    ) {
      fieldErrors[field as LeadFieldName] = issue.message;
    }
  }

  return fieldErrors;
}

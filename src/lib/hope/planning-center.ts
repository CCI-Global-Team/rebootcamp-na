import { z } from 'zod';

import type { HopeInterest } from './campaign';
import type { LeadSubmission } from './lead-schema';

const apiVersion = '2026-06-04';
type Env = Record<string, string | undefined>;

const configSchema = z.object({
  formId: z.string().min(1),
  clientId: z.string().min(1),
  secret: z.string().min(1),
  userAgent: z.string().min(1),
  fieldIds: z.object({ phone: z.string().min(1), city: z.string().min(1), interests: z.string().min(1) }),
  optionIds: z.record(z.string(), z.string().min(1)),
});

type Config = z.infer<typeof configSchema>;

export class MissingPlanningCenterConfigError extends Error {}

export class PlanningCenterSubmissionError extends Error {
  constructor(
    readonly status: number,
    readonly retryAfterSeconds?: number,
  ) {
    super('Planning Center rejected the submission.');
  }
}

function enabled(value: string | undefined) {
  return ['1', 'true', 'yes', 'on'].includes(value?.toLowerCase() ?? '');
}

function getConfig(env: Env): Config {
  const parsed = configSchema.safeParse({
    formId: env.PLANNING_CENTER_FORM_ID,
    clientId: env.PLANNING_CENTER_CLIENT_ID,
    secret: env.PLANNING_CENTER_SECRET,
    userAgent: env.PLANNING_CENTER_USER_AGENT,
    fieldIds: {
      phone: env.PLANNING_CENTER_FIELD_PHONE_ID,
      city: env.PLANNING_CENTER_FIELD_CITY_ID,
      interests: env.PLANNING_CENTER_FIELD_INTERESTS_ID,
    },
    optionIds: {
      Hope: env.PLANNING_CENTER_INTEREST_HOPE_OPTION_ID,
      Community: env.PLANNING_CENTER_INTEREST_COMMUNITY_OPTION_ID,
      Answers: env.PLANNING_CENTER_INTEREST_ANSWERS_OPTION_ID,
      'Just Curious': env.PLANNING_CENTER_INTEREST_JUST_CURIOUS_OPTION_ID,
    },
  });

  if (!parsed.success) throw new MissingPlanningCenterConfigError();
  return parsed.data;
}

function getRetryAfter(value: string | null) {
  if (!value) return undefined;
  const seconds = Number.parseInt(value, 10);
  if (Number.isFinite(seconds) && seconds >= 0) return seconds;
  const date = Date.parse(value);
  return Number.isNaN(date) ? undefined : Math.max(0, Math.ceil((date - Date.now()) / 1000));
}

function buildPayload(lead: LeadSubmission, config: Config) {
  const values: Array<Record<string, string>> = [{ form_field_id: config.fieldIds.city, value: lead.city }];

  if (lead.phone) {
    values.push({ form_field_id: config.fieldIds.phone, location: 'Mobile', number: lead.phone });
  }
  for (const interest of lead.interests) {
    values.push({
      form_field_id: config.fieldIds.interests,
      value: config.optionIds[interest satisfies HopeInterest] ?? interest,
    });
  }

  return {
    data: {
      type: 'FormSubmission',
      attributes: {
        person_attributes: {
          first_name: lead.firstName,
          last_name: lead.lastName,
          emails_attributes: [{ location: 'Home', address: lead.email }],
        },
      },
    },
    included: values.map((attributes) => ({ type: 'FormSubmissionValue', attributes })),
  };
}

export async function submitLead(lead: LeadSubmission, env: Env = process.env) {
  if (enabled(env.PLANNING_CENTER_USE_MOCK_SUBMISSIONS)) {
    console.info('[hope] Mock Planning Center submission', { lead });
    return { mode: 'mock' as const };
  }

  const config = getConfig(env);
  const credentials = Buffer.from(`${config.clientId}:${config.secret}`).toString('base64');
  const response = await fetch(
    `https://api.planningcenteronline.com/people/v2/forms/${config.formId}/form_submissions`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
        'User-Agent': config.userAgent,
        'X-PCO-API-Version': apiVersion,
      },
      body: JSON.stringify(buildPayload(lead, config)),
    },
  );

  if (enabled(env.PLANNING_CENTER_LOG_SUBMISSIONS)) {
    console.info('[hope] Planning Center response', { status: response.status });
  }
  if (!response.ok) {
    throw new PlanningCenterSubmissionError(response.status, getRetryAfter(response.headers.get('Retry-After')));
  }
  return { mode: 'live' as const };
}

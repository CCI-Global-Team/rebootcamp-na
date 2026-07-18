import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod/v4';

export const serverEnv = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PLANNING_CENTER_USE_MOCK_SUBMISSIONS: z.string().optional(),
    PLANNING_CENTER_LOG_SUBMISSIONS: z.string().optional(),
    PLANNING_CENTER_FORM_ID: z.string().optional(),
    PLANNING_CENTER_CLIENT_ID: z.string().optional(),
    PLANNING_CENTER_SECRET: z.string().optional(),
    PLANNING_CENTER_USER_AGENT: z.string().optional(),
    PLANNING_CENTER_FIELD_PHONE_ID: z.string().optional(),
    PLANNING_CENTER_FIELD_CITY_ID: z.string().optional(),
    PLANNING_CENTER_FIELD_INTERESTS_ID: z.string().optional(),
    PLANNING_CENTER_INTEREST_HOPE_OPTION_ID: z.string().optional(),
    PLANNING_CENTER_INTEREST_COMMUNITY_OPTION_ID: z.string().optional(),
    PLANNING_CENTER_INTEREST_ANSWERS_OPTION_ID: z.string().optional(),
    PLANNING_CENTER_INTEREST_JUST_CURIOUS_OPTION_ID: z.string().optional(),
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: {},
});

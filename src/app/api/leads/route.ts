import { track } from '@vercel/analytics/server';
import { getChurchCenterFormUrl } from '@/lib/weekend/campaign';
import { getLeadFieldErrors, leadSubmissionSchema } from '@/lib/weekend/lead-schema';
import {
  MissingPlanningCenterConfigError,
  PlanningCenterSubmissionError,
  submitLead,
} from '@/lib/weekend/planning-center';

export const runtime = 'nodejs';

async function trackWeekendFormSubmission(mode: 'live' | 'mock') {
  try {
    await track('Weekend Form Submitted', {
      mode,
      page: '/weekend',
    });
  } catch (error) {
    console.warn('[weekend] Failed to track Vercel analytics event', { error });
  }
}

export async function POST(request: Request) {
  const input = await request.json().catch(() => null);
  const parsed = leadSubmissionSchema.safeParse(input);

  if (!parsed.success) {
    return Response.json(
      { message: 'Please fix the field messages above.', fieldErrors: getLeadFieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  if (parsed.data.website) return Response.json({ message: 'Thanks. Your details were sent.' });

  const fallbackHref = getChurchCenterFormUrl();
  try {
    const submission = await submitLead(parsed.data);
    await trackWeekendFormSubmission(submission.mode);
    return Response.json({ message: 'Thanks. Your details were sent.', mode: submission.mode });
  } catch (error) {
    if (error instanceof MissingPlanningCenterConfigError) {
      return Response.json(
        { message: 'Online submission is not configured yet. Please use the Church Center form link.', fallbackHref },
        { status: 503 },
      );
    }
    if (error instanceof PlanningCenterSubmissionError) {
      if (error.status === 429) {
        const message = error.retryAfterSeconds
          ? `We are receiving a lot of submissions. Please wait ${error.retryAfterSeconds} seconds and try again.`
          : 'We are receiving a lot of submissions. Please try again in a moment.';
        return Response.json(
          { message, fallbackHref, retryAfterSeconds: error.retryAfterSeconds },
          {
            status: 429,
            headers: error.retryAfterSeconds ? { 'Retry-After': String(error.retryAfterSeconds) } : undefined,
          },
        );
      }
      return Response.json(
        {
          message: 'We could not send your details. Please try again or use the Church Center form link.',
          fallbackHref,
        },
        { status: 502 },
      );
    }
    return Response.json(
      { message: 'Something went wrong. Please try again or use the Church Center form link.', fallbackHref },
      { status: 500 },
    );
  }
}

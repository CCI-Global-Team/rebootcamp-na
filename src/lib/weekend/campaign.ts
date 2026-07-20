export const campaignInterests = ['Hope', 'Community', 'Answers', 'Just Curious'] as const;

export type CampaignInterest = (typeof campaignInterests)[number];

export const weekendCampaign = {
  slug: 'weekend' as const,
  eyebrow: 'Reboot Camp North America',
  heroTitle: 'Hope Starts Here',
  heroLead: 'A new invitation is taking shape.',
  heroCopy: [
    'Placeholder campaign copy will introduce the heart of this invitation and help visitors understand what comes next.',
    'This space is ready for the final story, event details, and message when the campaign direction is confirmed.',
  ],
  formTitle: 'Stay in the loop',
  formIntro: 'Leave your details and we’ll send you the latest information as it becomes available.',
  submitLabel: 'Keep Me Updated',
  finePrint:
    'By submitting, you agree to be contacted by Celebration Church International / Reboot Camp about this invitation. We respect your inbox.',
  thanksTitle: 'It’s Sent.',
  thanksBody: 'Thanks for reaching out. We’ll be in touch with more details soon.',
  nextLabel: 'Visit Reboot Camp',
  nextHref: '/',
  interests: campaignInterests,
  footerTitle: 'Hope Campaign',
  footerBody: 'Placeholder footer copy for this campaign landing page.',
} as const;

export function getChurchCenterFormUrl() {
  return process.env.NEXT_PUBLIC_CHURCH_CENTER_FORM_URL || '/';
}

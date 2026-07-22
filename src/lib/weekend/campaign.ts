export const campaignInterests = [
  "Hope",
  "Community",
  "Answers",
  "Just Curious",
] as const;

export type CampaignInterest = (typeof campaignInterests)[number];

export const weekendCampaign = {
  slug: "weekend" as const,

  // Retained for the lead form, which is currently dormant but may be reused.
  submitLabel: "Keep Me Updated",
  finePrint:
    "By submitting, you agree to be contacted by Celebration Church International / Reboot Camp about this invitation. We respect your inbox.",
  thanksTitle: "It’s Sent.",
  thanksBody:
    "Thanks for reaching out. We’ll be in touch with more details soon.",
  nextLabel: "Visit Reboot Camp",
  nextHref: "/",
  interests: campaignInterests,

  landing: {
    metadata: {
      title: "Reboot Camp — Labour Day Weekend 2026 | Toronto",
      description:
        "Join thousands in Toronto, September 4–6, 2026, for three unforgettable days of worship, community, inspiration, and life-changing moments.",
    },
    wordmark: "Reboot Camp",
    registerLabel: "Register Now",
    hero: {
      eyebrow: "Labour Day Weekend · Toronto",
      title: "What If One Weekend Changed Everything?",
      description:
        "Join thousands this Labour Day weekend for three unforgettable days of worship, community, inspiration, and life-changing moments.",
      trailerLabel: "Watch the 60-Second Trailer",
      highlights: [
        "Sept 4–6, 2026",
        "Toronto, Ontario",
        "Thousands Attend Every Year",
        "Registration Required",
      ],
    },
    trailer: {
      heading: "See Why Thousands Return Every Year.",
      placeholderLabel: "Trailer coming soon",
      caption: "The official Reboot Camp highlight trailer will be added here.",
    },
    benefits: {
      eyebrow: "Why Reboot",
      heading: "Three Days. One Turning Point.",
      items: [
        {
          title: "Encounter God",
          description: "Real, personal moments of worship and presence.",
          image: "/images/worship.webp",
          alt: "Worshippers gathered at Reboot Camp",
        },
        {
          title: "Build Real Community",
          description: "Friendships that outlast the weekend.",
          image: "/images/community.webp",
          alt: "Reboot Camp attendees connecting in community",
        },
        {
          title: "Grow in Your Faith",
          description: "Teaching that meets you where you are.",
          image: "/images/teaching-2.webp",
          alt: "A teaching session at Reboot Camp",
        },
        {
          title: "Create Unforgettable Memories",
          description: "Moments you will be telling stories about for years.",
          image: "/images/celebration.webp",
          alt: "Attendees celebrating together at Reboot Camp",
        },
      ],
    },
    socialProof: {
      heading: "Thousands from across North America gather every year.",
      testimonials: [
        {
          id: 1,
          quote: "Attendee testimonial coming soon.",
          attribution: "Name and city to be confirmed",
        },
        {
          id: 2,
          quote: "Attendee testimonial coming soon.",
          attribution: "Name and city to be confirmed",
        },
        {
          id: 3,
          quote: "Attendee testimonial coming soon.",
          attribution: "Name and city to be confirmed",
        },
      ],
    },
    snapshot: {
      eyebrow: "Event Snapshot",
      heading: "Everything You Need to Know",
      items: [
        { label: "September 4–6, 2026", icon: "calendar" },
        { label: "Toronto, Ontario", icon: "location" },
        { label: "Everyone Welcome", icon: "people" },
        { label: "Childcare Available", icon: "childcare" },
        { label: "Registration Required", icon: "check" },
      ],
    },
    finalCta: {
      heading: "Ready for a Different Labour Day Weekend?",
      body: "This could be more than another weekend—it could be the beginning of something new.",
    },
    footer: {
      details: "North America · Toronto, Ontario · September 4–6, 2026",
      website: {
        label: "rebootcampna.org",
        href: "https://rebootcampna.org",
      },
      email: "canada@joincci.org",
      copyright:
        "© 2026 Celebration Church International. All rights reserved.",
    },
  },
} as const;

export function getChurchCenterFormUrl() {
  return process.env.NEXT_PUBLIC_CHURCH_CENTER_FORM_URL || "/";
}

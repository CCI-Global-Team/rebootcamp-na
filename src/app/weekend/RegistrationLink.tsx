"use client";

import { track } from "@vercel/analytics";
import type { ComponentProps } from "react";

type RegistrationLinkProps = ComponentProps<"a"> & {
  placement: "header" | "hero" | "final_cta";
};

export function RegistrationLink({
  children,
  onClick,
  placement,
  ...props
}: RegistrationLinkProps) {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    track("Registration CTA Clicked", {
      cta: "main_registration",
      page: `/weekend|${placement}`,
    });

    onClick?.(event);
  }

  return (
    <a {...props} onClick={handleClick}>
      {children}
    </a>
  );
}

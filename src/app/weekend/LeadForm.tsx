"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import { weekendCampaign } from "@/lib/weekend/campaign";
import {
  formatNorthAmericanPhoneInput,
  getLeadFieldErrors,
  leadSubmissionSchema,
} from "@/lib/weekend/lead-schema";
import type { LeadFieldErrors, LeadFieldName } from "@/lib/weekend/lead-schema";

type SubmitState =
  | { status: "idle" | "submitting" | "success"; message: string }
  | { status: "error"; message: string; fallbackHref?: string };

const fieldOrder: LeadFieldName[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "city",
  "interests",
];
const validationErrorMessage = "Please fix the field messages above.";
const labelClass =
  "mb-2 block font-barlow-condensed text-xs font-semibold tracking-[.1em] text-white uppercase [&_span]:font-normal [&_span]:text-white/40";
const inputClass =
  "min-h-13 w-full rounded-sm border border-white/10 bg-white/5 px-4 font-inter text-base text-white placeholder:text-white/35 focus:border-[#e8c033]/55 focus:outline-2 focus:outline-offset-3 focus:outline-[#e8c033] aria-invalid:border-[#ff8e8e]";

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p className="mt-2 text-xs text-[#ffadad]" id={id}>
      {message}
    </p>
  ) : null;
}

export function LeadForm({ fallbackHref }: { fallbackHref: string }) {
  const id = useId();
  const successRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<SubmitState>({
    status: "idle",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<LeadFieldErrors>({});

  useEffect(() => {
    const hasFieldErrors = fieldOrder.some((field) =>
      Boolean(fieldErrors[field]),
    );

    if (
      state.status === "error" &&
      state.message === validationErrorMessage &&
      !hasFieldErrors
    ) {
      setState({ status: "idle", message: "" });
    }
  }, [fieldErrors, state]);

  const fieldIds = Object.fromEntries(
    fieldOrder.map((field) => [field, `${id}-${field}`]),
  ) as Record<LeadFieldName, string>;
  const errorIds = Object.fromEntries(
    fieldOrder.map((field) => [field, `${id}-${field}-error`]),
  ) as Record<LeadFieldName, string>;

  function clearFieldError(field: LeadFieldName) {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function focusFirstError(errors: LeadFieldErrors) {
    const first = fieldOrder.find((field) => errors[field]);
    if (first)
      requestAnimationFrame(() =>
        document.getElementById(fieldIds[first])?.focus(),
      );
  }

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    event.currentTarget.value = formatNorthAmericanPhoneInput(
      event.currentTarget.value,
    );
    clearFieldError("phone");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      campaign: "weekend",
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      city: String(formData.get("city") ?? ""),
      interests: formData.getAll("interests").map(String),
      website: String(formData.get("website") ?? ""),
    };
    const parsed = leadSubmissionSchema.safeParse(payload);

    if (!parsed.success) {
      const errors = getLeadFieldErrors(parsed.error);
      setFieldErrors(errors);
      setState({
        status: "error",
        message: validationErrorMessage,
      });
      focusFirstError(errors);
      return;
    }

    setFieldErrors({});
    setState({ status: "submitting", message: "Sending your details." });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = (await response.json().catch(() => null)) as {
        message?: string;
        fallbackHref?: string;
        fieldErrors?: LeadFieldErrors;
      } | null;

      if (!response.ok) {
        const errors = result?.fieldErrors ?? {};
        setFieldErrors(errors);
        setState({
          status: "error",
          message:
            result?.message ?? "We could not send the form. Please try again.",
          fallbackHref: result?.fallbackHref,
        });
        focusFirstError(errors);
        return;
      }

      setState({ status: "success", message: "Your details were sent." });
      requestAnimationFrame(() => {
        successRef.current?.focus();
        successRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
    } catch {
      setState({
        status: "error",
        message:
          "We could not send the form. Please try again or use the Church Center form link.",
        fallbackHref,
      });
    }
  }

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        className="px-4 py-8 text-center outline-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#e8c033]"
        tabIndex={-1}
      >
        <p className="font-barlow-condensed mb-4 text-sm font-bold tracking-[.16em] text-[#e8c033] uppercase">
          Details received
        </p>
        <h3 className="font-oswald text-[clamp(2.5rem,7vw,4rem)] leading-none font-bold uppercase">
          {weekendCampaign.thanksTitle}
        </h3>
        <p className="mx-auto mt-5 max-w-md leading-7 text-white/65">
          {weekendCampaign.thanksBody}
        </p>
        <a
          className="font-oswald mt-8 inline-flex rounded-sm border border-[#e8c033] px-6 py-3 font-semibold tracking-widest text-[#e8c033] uppercase focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#e8c033]"
          href={weekendCampaign.nextHref}
        >
          {weekendCampaign.nextLabel}
        </a>
      </div>
    );
  }

  const inputProps = (field: LeadFieldName) => ({
    "aria-describedby": fieldErrors[field] ? errorIds[field] : undefined,
    "aria-invalid": Boolean(fieldErrors[field]),
  });

  return (
    <form className="flex flex-col gap-5" noValidate onSubmit={handleSubmit}>
      <input type="hidden" name="campaign" value="weekend" />
      <div className="absolute -left-[100vw]" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className={labelClass}>Your name *</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="sr-only" htmlFor={fieldIds.firstName}>
              First name
            </label>
            <input
              className={inputClass}
              id={fieldIds.firstName}
              name="firstName"
              autoComplete="given-name"
              placeholder="First name"
              required
              {...inputProps("firstName")}
              onChange={() => clearFieldError("firstName")}
            />
            <FieldError
              id={errorIds.firstName}
              message={fieldErrors.firstName}
            />
          </div>
          <div>
            <label className="sr-only" htmlFor={fieldIds.lastName}>
              Last name
            </label>
            <input
              className={inputClass}
              id={fieldIds.lastName}
              name="lastName"
              autoComplete="family-name"
              placeholder="Last name"
              required
              {...inputProps("lastName")}
              onChange={() => clearFieldError("lastName")}
            />
            <FieldError id={errorIds.lastName} message={fieldErrors.lastName} />
          </div>
        </div>
      </fieldset>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor={fieldIds.email}>
            Email
          </label>
          <input
            className={inputClass}
            id={fieldIds.email}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            required
            {...inputProps("email")}
            onChange={() => clearFieldError("email")}
          />
          <FieldError id={errorIds.email} message={fieldErrors.email} />
        </div>
        <div>
          <label className={labelClass} htmlFor={fieldIds.phone}>
            Phone <span>(optional)</span>
          </label>
          <input
            className={inputClass}
            id={fieldIds.phone}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+1 (___) ___-____"
            {...inputProps("phone")}
            onChange={handlePhoneChange}
          />
          <FieldError id={errorIds.phone} message={fieldErrors.phone} />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor={fieldIds.city}>
          City
        </label>
        <input
          className={inputClass}
          id={fieldIds.city}
          name="city"
          autoComplete="address-level2"
          placeholder="Where are you joining from?"
          required
          {...inputProps("city")}
          onChange={() => clearFieldError("city")}
        />
        <FieldError id={errorIds.city} message={fieldErrors.city} />
      </div>

      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className={labelClass} id={fieldIds.interests}>
          What are you hoping to find? <span>(optional)</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {weekendCampaign.interests.map((interest) => (
            <label className="cursor-pointer" key={interest}>
              <input
                className="peer sr-only"
                type="checkbox"
                name="interests"
                value={interest}
              />
              <span className="inline-flex min-h-11 items-center rounded-full border border-white/10 bg-white/4 px-5 text-sm text-white/65 transition peer-checked:border-[#e8c033] peer-checked:bg-[#e8c033]/13 peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-[#e8c033]">
                {interest}
              </span>
            </label>
          ))}
        </div>
        <FieldError id={errorIds.interests} message={fieldErrors.interests} />
      </fieldset>

      {state.message ? (
        <div
          className={
            state.status === "error"
              ? "text-sm leading-6 text-[#ffadad]"
              : "text-sm leading-6 text-white/65"
          }
          role={state.status === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          <p className="m-0">{state.message}</p>
          {state.status === "error" && state.fallbackHref ? (
            <a
              className="mt-1 inline-block font-bold text-[#e8c033] underline"
              href={state.fallbackHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Complete the Church Center form
            </a>
          ) : null}
        </div>
      ) : null}

      <button
        className="font-oswald mt-1 min-h-14 w-full cursor-pointer rounded-sm bg-linear-to-br from-[#e8c033] to-[#e85d04] px-7 font-semibold tracking-widest text-[#080b1a] uppercase shadow-[0_4px_24px_rgba(232,92,4,.3)] transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#e8c033] disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 motion-reduce:transition-none"
        disabled={state.status === "submitting"}
        type="submit"
      >
        {state.status === "submitting"
          ? "Sending..."
          : weekendCampaign.submitLabel}
      </button>
      <p className="m-0 text-center text-xs leading-6 text-white/40">
        {weekendCampaign.finePrint}
      </p>
    </form>
  );
}

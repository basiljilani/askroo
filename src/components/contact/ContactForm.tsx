"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { interestOptions } from "@/lib/capabilities";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Record<string, string>;

const fieldBase =
  "w-full rounded-xl border bg-ink px-4 py-3 text-sm text-bright placeholder:text-faint transition-colors focus:outline-none focus-visible:border-accent-400";

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-center gap-2 text-sm text-dim"
      >
        {label}
        {optional ? (
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-faint">
            optional
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-accent-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SuccessCheck() {
  const reduced = useReducedMotion();
  return (
    <svg
      viewBox="0 0 52 52"
      className="h-14 w-14"
      fill="none"
      stroke="var(--color-accent-400)"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <motion.circle
        cx="26"
        cy="26"
        r="23"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M16 27l7 7 13-14"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: reduced ? 0 : 0.4,
          delay: reduced ? 0 : 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </svg>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    setErrors({});
    setFormError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      const json = (await res.json().catch(() => ({}))) as {
        errors?: Errors;
        error?: string;
      };
      if (res.status === 422 && json.errors) {
        setErrors(json.errors);
      } else {
        setFormError(json.error ?? "Something went wrong. Please try again.");
      }
      setStatus("error");
    } catch {
      setFormError("Couldn't reach the server. Please try again, or email us.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="panel flex flex-col items-center p-10 text-center">
        <SuccessCheck />
        <h2 className="mt-5 text-xl font-medium text-bright">
          Message sent.
        </h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-dim">
          Thanks — we read every one of these ourselves and will reply to your
          email soon.
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another
        </Button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="panel p-6 md:p-8">
      {/* Honeypot — off-screen, never shown to real users. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="name" label="Name" error={errors.name}>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={cn(
                fieldBase,
                errors.name ? "border-accent-500" : "border-hairline",
              )}
            />
          </Field>
          <Field id="email" label="Work email" error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={cn(
                fieldBase,
                errors.email ? "border-accent-500" : "border-hairline",
              )}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="company" label="Company" error={errors.company} optional>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              aria-invalid={errors.company ? true : undefined}
              aria-describedby={errors.company ? "company-error" : undefined}
              className={cn(
                fieldBase,
                errors.company ? "border-accent-500" : "border-hairline",
              )}
            />
          </Field>
          <Field
            id="storeUrl"
            label="Shopify store URL"
            error={errors.storeUrl}
            optional
          >
            <input
              id="storeUrl"
              name="storeUrl"
              type="text"
              inputMode="url"
              placeholder="yourstore.myshopify.com"
              aria-invalid={errors.storeUrl ? true : undefined}
              aria-describedby={errors.storeUrl ? "storeUrl-error" : undefined}
              className={cn(
                fieldBase,
                errors.storeUrl ? "border-accent-500" : "border-hairline",
              )}
            />
          </Field>
        </div>

        <Field id="interest" label="Area of interest" error={errors.interest}>
          <select
            id="interest"
            name="interest"
            defaultValue="beta"
            className={cn(
              fieldBase,
              "appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10",
              errors.interest ? "border-accent-500" : "border-hairline",
            )}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")",
            }}
          >
            {interestOptions.map((o) => (
              <option key={o.value} value={o.value} className="bg-ink">
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id="message" label="Message" error={errors.message}>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(
              fieldBase,
              "resize-y",
              errors.message ? "border-accent-500" : "border-hairline",
            )}
          />
        </Field>

        {formError ? (
          <p
            role="alert"
            className="rounded-lg border border-accent-600 bg-[color-mix(in_oklab,var(--color-accent-500)_10%,transparent)] px-4 py-3 text-sm text-accent-300"
          >
            {formError}
          </p>
        ) : null}

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={submitting} className="min-w-[9rem]">
            {submitting ? "Sending…" : "Send message"}
          </Button>
          <p aria-live="polite" className="text-xs text-faint">
            {submitting ? "Sending your message…" : "We reply within a day or two."}
          </p>
        </div>
      </div>
    </form>
  );
}

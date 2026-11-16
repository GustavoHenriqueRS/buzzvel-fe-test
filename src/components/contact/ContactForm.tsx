"use client";

import { useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/contact/FormField";
import { contactContent, contactFields, type ContactFieldName } from "@/data/contact";

type Values = Record<ContactFieldName, string>;
type Errors = Partial<Record<ContactFieldName, string>>;

const emptyValues: Values = { name: "", email: "", question: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your full name (at least 2 characters).";
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.question.trim().length < 10)
    errors.question = "Please tell us a bit more (at least 10 characters).";
  return errors;
}

/** Mock request: there is no backend, so we only simulate network latency. */
const sendMessage = () => new Promise((resolve) => setTimeout(resolve, 1200));

export function ContactForm() {
  const baseId = useId();
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const fieldRefs = useRef<Partial<Record<ContactFieldName, HTMLInputElement | HTMLTextAreaElement | null>>>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name as ContactFieldName;
    const next = { ...values, [name]: event.target.value };
    setValues(next);
    if (status === "sent") setStatus("idle");
    // Only re-validate live after the first submit attempt, so users aren't nagged while typing.
    if (submitted) setErrors(validate(next));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    setSubmitted(true);
    setStatus("idle");
    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstInvalid = contactFields.find((field) => nextErrors[field.name]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid.name]?.focus();
      return;
    }

    setStatus("sending");
    await sendMessage();
    setValues(emptyValues);
    setErrors({});
    setSubmitted(false);
    setStatus("sent");
  };

  const sending = status === "sending";

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-5">
        {contactFields.map((field) => (
          <FormField
            key={field.name}
            id={`${baseId}-${field.name}`}
            name={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            value={values[field.name]}
            onChange={handleChange}
            error={errors[field.name]}
            inputRef={(node) => {
              fieldRefs.current[field.name] = node;
            }}
          />
        ))}
      </div>

      <Button
        type="submit"
        className={`w-full ${sending ? "cursor-wait opacity-80" : ""}`}
        aria-disabled={sending}
      >
        {sending && (
          <span
            aria-hidden="true"
            className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          />
        )}
        {sending ? "Sending..." : contactContent.submitLabel}
      </Button>

      <p
        id={`${baseId}-status`}
        role="status"
        className={status === "sent" ? "rounded-lg bg-blue-soft px-4 py-3 text-body text-ink" : "sr-only"}
      >
        {status === "sent" ? contactContent.successMessage : ""}
      </p>
    </form>
  );
}

import type { ChangeEvent, Ref } from "react";

type FormFieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: "text" | "email" | "textarea";
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  inputRef?: Ref<HTMLInputElement & HTMLTextAreaElement>;
};

const controlBase =
  "w-full rounded-lg border bg-cream px-4 text-body text-ink placeholder:text-ink-muted transition-colors focus:border-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue";

/** Labelled input/textarea that wires its inline error through aria-invalid + aria-describedby. */
export function FormField({
  id,
  name,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  error,
  inputRef,
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    value,
    onChange,
    placeholder,
    required: true,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    ref: inputRef,
  };
  const border = error ? "border-[#d92d20]" : "border-line";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-body font-bold text-ink">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          {...shared}
          rows={3}
          className={`${controlBase} ${border} h-[100px] resize-none py-3.5 lg:h-[120px]`}
        />
      ) : (
        <input
          {...shared}
          type={type}
          autoComplete={autoComplete}
          className={`${controlBase} ${border} py-3`}
        />
      )}
      {error && (
        <p id={errorId} className="text-body text-[#d92d20]">
          {error}
        </p>
      )}
    </div>
  );
}

"use client";

/** Shared labeled input primitives for the ROI calculator (real <label>s, keyboard-first). */

import { useId, type ReactNode } from "react";

export function NumberField({
  label,
  value,
  onChange,
  hint,
  prefix,
  suffix,
  placeholder,
  required = false,
  invalid = false,
  min = 0,
  step,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  required?: boolean;
  invalid?: boolean;
  min?: number;
  step?: number | "any";
}) {
  const id = useId();
  const hintId = `${id}-hint`;
  return (
    <div className={invalid ? "roi-field roi-field--invalid" : "roi-field"}>
      <label htmlFor={id}>
        {label}
        {required && <span className="roi-required" aria-hidden="true"> *</span>}
      </label>
      <div className="roi-input-wrap">
        {prefix && <span className="roi-affix" aria-hidden="true">{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          step={step ?? "any"}
          value={value}
          placeholder={placeholder}
          aria-describedby={hint ? hintId : undefined}
          aria-invalid={invalid || undefined}
          onChange={(e) => onChange(e.target.value)}
        />
        {suffix && <span className="roi-affix" aria-hidden="true">{suffix}</span>}
      </div>
      {hint && <p id={hintId} className="roi-hint">{hint}</p>}
    </div>
  );
}

export function Segmented<T extends string>({
  legend,
  value,
  options,
  onChange,
}: {
  legend: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  const name = useId();
  return (
    <fieldset className="roi-segmented">
      <legend>{legend}</legend>
      <div className="roi-segmented-track" role="radiogroup" aria-label={legend}>
        {options.map((opt) => (
          <label key={opt.value} className="roi-segment">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
  children,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  children?: ReactNode;
}) {
  const id = useId();
  return (
    <div className="roi-toggle-block">
      <div className="roi-toggle-row">
        <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <label htmlFor={id}>{label}</label>
      </div>
      {checked && children}
    </div>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import clsx from "clsx";
import IconUser from "@/assets/icons/icon-user.svg";
import Building from "@/assets/icons/building.svg";
import IconPhone from "@/assets/icons/icon-phone.svg";
import Mail from "@/assets/icons/mail.svg";
import IconTag from "@/assets/icons/icon-tag.svg";
import IconBox from "@/assets/icons/icon-box.svg";
import IconMessage from "@/assets/icons/icon-message.svg";
import IconSend from "@/assets/icons/icon-send.svg";
import IconShield from "@/assets/icons/icon-shield.svg";
import { contactFaqContent } from "../content";

function FieldGroup({
  label,
  required,
  icon,
  children,
}: {
  label: string;
  required?: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-sm font-semibold leading-5 text-[#333]">
        {label}
        {required && <span className="text-[#b20000]"> *</span>}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute bottom-[23.91%] left-[14px] top-[23.91%] flex items-center">
          {icon}
        </div>
        {children}
      </div>
    </div>
  );
}

function InputField({
  name,
  type = "text",
  placeholder,
  required,
}: {
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <input
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
      className={clsx(
        "w-full rounded-[12px] border border-[rgba(0,0,0,0.1)] bg-[#f9fafb]",
        "pb-[15px] pl-[41px] pr-[17px] pt-[14px]",
        "text-sm font-medium text-[#333] outline-none transition-colors",
        "placeholder:text-[#aab0b7] focus:border-app-accent-blue"
      )}
    />
  );
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 1000);
  }

  return (
    <div className="relative flex flex-col gap-8 overflow-clip rounded-[16px] border border-[#f3f4f6] bg-white p-[41px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]">
      <div className="absolute left-0 right-[0.01px] top-0 h-1 bg-gradient-to-r from-app-accent-blue to-app-brand-teal" />
      <div className="flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-full bg-[rgba(41,115,178,0.1)]">
          <IconMessage className="shrink-0" />
        </div>
        <h3 className="text-xl font-black uppercase tracking-[0.5px] text-[#333]">{contactFaqContent.form.title}</h3>
      </div>

      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
        <div className="flex gap-5 max-md:flex-col">
          <FieldGroup label={contactFaqContent.form.nameLabel} required icon={<IconUser className="shrink-0" />}>
            <InputField name="name" placeholder={contactFaqContent.form.namePlaceholder} required />
          </FieldGroup>
          <FieldGroup label={contactFaqContent.form.companyLabel} icon={<Building className="shrink-0" />}>
            <InputField name="company" placeholder={contactFaqContent.form.companyPlaceholder} />
          </FieldGroup>
        </div>

        <div className="flex gap-5 max-md:flex-col">
          <FieldGroup label={contactFaqContent.form.phoneLabel} required icon={<IconPhone className="shrink-0" />}>
            <InputField name="phone" type="tel" placeholder={contactFaqContent.form.phonePlaceholder} required />
          </FieldGroup>
          <FieldGroup label={contactFaqContent.form.emailLabel} icon={<Mail className="shrink-0" />}>
            <InputField name="email" type="email" placeholder={contactFaqContent.form.emailPlaceholder} />
          </FieldGroup>
        </div>

        <FieldGroup label={contactFaqContent.form.subjectLabel} required icon={<IconTag className="shrink-0" />}>
          <div className="relative">
            <input type="hidden" name="subject" value={selectedSubject} />
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              required
              className={clsx(
                "w-full appearance-none rounded-[12px] border border-[rgba(0,0,0,0.1)]",
                "bg-[#f9fafb] py-[13px] pl-[41px] pr-[17px]",
                "text-sm font-medium text-[#333] outline-none transition-colors",
                "focus:border-app-accent-blue"
              )}
            >
              <option value="" disabled>
                {contactFaqContent.form.subjectPlaceholder}
              </option>
              {contactFaqContent.form.subjectOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2">
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M1 1.5L6 6.5L11 1.5"
                  stroke="#9CA3AF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </FieldGroup>

        <FieldGroup label={contactFaqContent.form.quantityLabel} icon={<IconBox className="shrink-0" />}>
          <InputField name="quantity" placeholder={contactFaqContent.form.quantityPlaceholder} />
        </FieldGroup>

        <FieldGroup label={contactFaqContent.form.messageLabel} required icon={<IconMessage className="shrink-0" />}>
          <textarea
            name="message"
            required
            placeholder={contactFaqContent.form.messagePlaceholder}
            rows={4}
            className={clsx(
              "w-full rounded-[12px] border border-[rgba(0,0,0,0.1)] bg-[#f9fafb]",
              "px-[17px] py-[13px] text-sm font-medium text-[#333]",
              "outline-none transition-colors placeholder:text-[#aab0b7]",
              "focus:border-app-accent-blue"
            )}
          />
        </FieldGroup>

        <div className="flex items-center gap-4 pt-2 max-sm:flex-col">
          <button
            type="submit"
            disabled={isSubmitting}
            className={clsx(
              "inline-flex items-center gap-3 rounded-[12px] bg-app-accent-blue",
              "px-10 py-4 text-sm font-bold uppercase tracking-[0.35px] text-white",
              "shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]",
              "transition-opacity hover:opacity-90 disabled:opacity-50"
            )}
          >
            <IconSend className="shrink-0" />
            <span>{contactFaqContent.form.submitLabel}</span>
          </button>
          <div className="flex items-center gap-1 text-xs text-[#9ca3af]">
            <IconShield className="shrink-0" />
            <span>{contactFaqContent.form.securityNote}</span>
          </div>
        </div>
      </form>
    </div>
  );
}

"use client";

import { createPortal } from "react-dom";
import { useState, useRef, useEffect } from "react";
import type { FormEvent } from "react";
import clsx from "clsx";
import AppInput from "@/shared/ui/app-input";
import AppTextarea from "@/shared/ui/app-textarea";
import AppButton from "@/shared/ui/app-button";
import IconSend from "@/assets/icons/icon-send.svg";
import IconShield from "@/assets/icons/icon-shield.svg";
import IconMessage from "@/assets/icons/icon-message.svg";
import { contactFaqContent } from "../content";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function openMenu() {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuStyle({
        position: "fixed",
        left: Math.max(16, rect.left),
        top: rect.bottom + 4,
        width: rect.width,
        zIndex: 100,
      });
    }
    setIsOpen(true);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 1000);
  }

  return (
    <div
      className={clsx(
        "relative flex flex-col gap-6 overflow-clip rounded-[16px] border lg:gap-8",
        "border-[#f3f4f6] bg-white p-6 lg:p-[41px]",
        "shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]"
      )}
    >
      <div
        className={clsx(
          "absolute left-0 right-[0.01px] top-0 h-1 bg-gradient-to-r",
          "from-app-accent-blue to-app-brand-teal"
        )}
      />

      <div className={clsx("flex items-center gap-3")}>
        <div className={clsx("flex size-8 items-center justify-center rounded-full bg-[rgba(41,115,178,0.1)]")}>
          <IconMessage className={clsx("shrink-0")} />
        </div>
        <h3 className={clsx("text-lg font-black uppercase tracking-[0.5px] text-[#333] lg:text-xl")}>
          {contactFaqContent.form.title}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className={clsx("flex w-full flex-col gap-5 lg:gap-6")}>
        <div className={clsx("flex gap-5 max-md:flex-col")}>
          <div className={clsx("flex flex-1 flex-col gap-1.5")}>
            <label className={clsx("text-sm font-semibold leading-5 text-[#333]")}>
              {contactFaqContent.form.nameLabel}
              <span className={clsx("text-[#b20000]")}> *</span>
            </label>
            <AppInput name="name" placeholder={contactFaqContent.form.namePlaceholder} required />
          </div>
          <div className={clsx("flex flex-1 flex-col gap-1.5")}>
            <label className={clsx("text-sm font-semibold leading-5 text-[#333]")}>
              {contactFaqContent.form.companyLabel}
            </label>
            <AppInput name="company" placeholder={contactFaqContent.form.companyPlaceholder} />
          </div>
        </div>

        <div className={clsx("flex gap-5 max-md:flex-col")}>
          <div className={clsx("flex flex-1 flex-col gap-1.5")}>
            <label className={clsx("text-sm font-semibold leading-5 text-[#333]")}>
              {contactFaqContent.form.phoneLabel}
              <span className={clsx("text-[#b20000]")}> *</span>
            </label>
            <AppInput name="phone" type="tel" placeholder={contactFaqContent.form.phonePlaceholder} required />
          </div>
          <div className={clsx("flex flex-1 flex-col gap-1.5")}>
            <label className={clsx("text-sm font-semibold leading-5 text-[#333]")}>
              {contactFaqContent.form.emailLabel}
            </label>
            <AppInput name="email" type="email" placeholder={contactFaqContent.form.emailPlaceholder} />
          </div>
        </div>

        <div className={clsx("flex flex-col gap-1.5")}>
          <label className={clsx("text-sm font-semibold leading-5 text-[#333]")}>
            {contactFaqContent.form.subjectLabel}
            <span className={clsx("text-[#b20000]")}> *</span>
          </label>
          <div className={clsx("relative")}>
            <input type="hidden" name="subject" value={selectedSubject} />
            <button
              ref={triggerRef}
              type="button"
              onClick={() => (isOpen ? setIsOpen(false) : openMenu())}
              className={clsx(
                "flex w-full items-center justify-between rounded-[6px]",
                "border border-[#d1d5db] bg-white py-[11px] pl-[17px] pr-[33px]",
                "text-left text-sm font-medium outline-none"
              )}
            >
              <span className={clsx(selectedSubject ? "text-[#333]" : "text-[#9ca3af]")}>
                {selectedSubject
                  ? contactFaqContent.form.subjectOptions.find((o) => o.value === selectedSubject)?.label
                  : contactFaqContent.form.subjectPlaceholder}
              </span>
              <svg
                className={clsx("shrink-0 text-[#333] transition-transform", isOpen && "rotate-180")}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {isOpen &&
              typeof document !== "undefined" &&
              createPortal(
                <div
                  ref={menuRef}
                  style={menuStyle}
                  className={clsx(
                    "overflow-hidden rounded-xl border border-gray-200 bg-white",
                    "shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
                  )}
                >
                  {contactFaqContent.form.subjectOptions.map((opt) => {
                    const isSelected = opt.value === selectedSubject;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setSelectedSubject(opt.value);
                          setIsOpen(false);
                        }}
                        className={clsx(
                          "flex w-full px-4 py-3 text-left text-sm leading-5 transition-colors",
                          isSelected
                            ? "bg-[rgba(41,115,178,0.08)] font-semibold text-[#2973b2]"
                            : "text-[#374151] hover:bg-gray-50"
                        )}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>,
                document.body
              )}
          </div>
        </div>

        <div className={clsx("flex flex-col gap-1.5")}>
          <label className={clsx("text-sm font-semibold leading-5 text-[#333]")}>
            {contactFaqContent.form.quantityLabel}
          </label>
          <AppInput name="quantity" placeholder={contactFaqContent.form.quantityPlaceholder} />
        </div>

        <div className={clsx("flex flex-col gap-1.5")}>
          <label className={clsx("text-sm font-semibold leading-5 text-[#333]")}>
            {contactFaqContent.form.messageLabel}
            <span className={clsx("text-[#b20000]")}> *</span>
          </label>
          <AppTextarea name="message" placeholder={contactFaqContent.form.messagePlaceholder} rows={4} required />
        </div>

        <div className={clsx("flex items-center gap-4 pt-2 max-sm:flex-col")}>
          <AppButton
            type="submit"
            cornerRadius={6}
            disabled={isSubmitting}
            className={clsx(
              "flex w-full items-center justify-center gap-3 sm:w-auto",
              "bg-app-accent-blue px-10 py-4",
              "text-sm font-bold uppercase tracking-[0.35px] text-white",
              "shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]",
              "hover:opacity-90 disabled:opacity-50"
            )}
            borderRadiusProps={{
              classNameContainer: "w-full sm:w-auto",
            }}
          >
            <IconSend className={clsx("shrink-0")} />
            {contactFaqContent.form.submitLabel}
          </AppButton>
          <div className={clsx("flex items-center gap-1 text-xs text-[#9ca3af]")}>
            <IconShield className={clsx("shrink-0")} />
            {contactFaqContent.form.securityNote}
          </div>
        </div>
      </form>
    </div>
  );
}

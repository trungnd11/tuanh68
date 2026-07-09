"use client";

import { createPortal } from "react-dom";
import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import AppInput from "@/shared/ui/app-input";
import AppTextarea from "@/shared/ui/app-textarea";
import AppButton from "@/shared/ui/app-button";

export interface QuoteFormField {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
}

export interface QuoteFormProduct {
  id: string;
  label: string;
}

export interface QuoteFormData {
  name: string;
  phone: string;
  product?: string;
  quantity?: string;
  message?: string;
}

interface AppQuoteFormProps {
  variant: "consultation" | "quote";
  content: Record<string, string>;
  products?: readonly QuoteFormProduct[];
  onSubmit?: (data: QuoteFormData) => void;
  submitIcon?: ReactNode;
  className?: string;
}

export default function AppQuoteForm({
  variant,
  content,
  products,
  onSubmit,
  submitIcon,
  className = "",
}: AppQuoteFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
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
    function handleScroll() {
      setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  function openMenu() {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const viewportPadding = 16;
      const gap = 12;
      const desiredHeight = Math.min((products?.length ?? 6) * 44 + 8, 328);
      const spaceBelow = window.innerHeight - rect.bottom - viewportPadding;
      const spaceAbove = rect.top - viewportPadding;
      const shouldOpenBottom = spaceBelow >= desiredHeight + gap || spaceBelow >= spaceAbove;
      const maxHeight = Math.min(328, Math.max((shouldOpenBottom ? spaceBelow : spaceAbove) - gap, 160));

      setMenuStyle({
        position: "fixed",
        left: Math.min(Math.max(rect.left, viewportPadding), window.innerWidth - viewportPadding - rect.width),
        top: shouldOpenBottom
          ? rect.bottom + gap
          : Math.max(viewportPadding, rect.top - gap - Math.min(desiredHeight, maxHeight)),
        width: rect.width,
      });
    }
    setIsOpen(true);
  }
  return (
    <form
      className={`flex w-full flex-col gap-6 ${className}`.trim()}
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data: QuoteFormData = {
          name: String(formData.get("name") || ""),
          phone: String(formData.get("phone") || ""),
        };
        if (variant === "quote") {
          data.product = String(formData.get("product") || "");
          data.quantity = String(formData.get("quantity") || "");
        } else {
          data.message = String(formData.get("message") || "");
        }
        onSubmit?.(data);
      }}
    >
      {variant === "quote" && (
        <h3 className="w-full text-xl font-black uppercase leading-7 text-[#333]">{content.title}</h3>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold leading-5 text-gray-700">
            {content.nameLabel}
            <span className="text-[#b20000]"> *</span>
          </label>
          <AppInput name="name" placeholder={content.namePlaceholder} required className="w-full" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold leading-5 text-gray-700">
            {content.phoneLabel}
            <span className="text-[#b20000]"> *</span>
          </label>
          <AppInput name="phone" type="tel" placeholder={content.phonePlaceholder} required className="w-full" />
        </div>

        {variant === "quote" && products && (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold leading-5 text-gray-700">{content.productLabel}</label>
            <div className="relative">
              <input type="hidden" name="product" value={selectedProduct} />
              <button
                ref={triggerRef}
                type="button"
                onClick={() => (isOpen ? setIsOpen(false) : openMenu())}
                className="flex w-full items-center justify-between rounded-[8px] border border-[#d1d5db] bg-white py-[11px] pl-[17px] pr-[33px] text-[14px] font-normal leading-[17px] outline-none"
              >
                <span className={selectedProduct ? "text-[#333]" : "text-[#9ca3af]"}>
                  {selectedProduct
                    ? products.find((p) => p.id === selectedProduct)?.label || content.productPlaceholder
                    : content.productPlaceholder}
                </span>
                <svg
                  className={`shrink-0 text-[#333] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
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
                    className="z-[100] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
                  >
                    {products.map((p) => {
                      const isSelected = p.id === selectedProduct;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setSelectedProduct(p.id);
                            setIsOpen(false);
                          }}
                          className={`flex w-full px-4 py-3 text-left text-[14px] leading-5 transition-colors ${
                            isSelected
                              ? "bg-[rgba(41,115,178,0.08)] font-semibold text-[#2973b2]"
                              : "text-[#374151] hover:bg-gray-50"
                          }`}
                        >
                          {p.label}
                        </button>
                      );
                    })}
                  </div>,
                  document.body
                )}
            </div>
          </div>
        )}

        {variant === "quote" ? (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold leading-5 text-gray-700">{content.quantityLabel}</label>
            <AppInput name="quantity" placeholder={content.quantityPlaceholder} className="w-full" />
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold leading-5 text-gray-700">{content.messageLabel}</label>
            <AppTextarea name="message" placeholder={content.messagePlaceholder} rows={3} className="w-full" />
          </div>
        )}

        <AppButton
          type="submit"
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#2973b2] py-4 text-sm font-black uppercase leading-5 tracking-[0.35px] text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
        >
          {submitIcon}
          <span>{content.submitLabel}</span>
        </AppButton>
      </div>
    </form>
  );
}

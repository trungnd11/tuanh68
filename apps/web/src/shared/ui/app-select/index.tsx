"use client";

import { createPortal } from "react-dom";
import SelectedIcon from "@/assets/icons/selected.svg";
import { useDeferredValue, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import type { AppSelectProps } from "./types";

type MenuPlacement = "top" | "bottom";

type MenuGeometry = {
  left: number;
  top: number;
  width: number;
  maxHeight: number;
};

function isSameGeometry(current: MenuGeometry | null, next: MenuGeometry) {
  if (!current) {
    return false;
  }

  return (
    current.left === next.left &&
    current.top === next.top &&
    current.width === next.width &&
    current.maxHeight === next.maxHeight
  );
}

function resolveMenuGeometry(
  rootElement: HTMLDivElement,
  desiredHeight = 328
): {
  geometry: MenuGeometry;
  placement: MenuPlacement;
} {
  const rootRect = rootElement.getBoundingClientRect();
  const viewportPadding = 16;
  const gap = 12;
  const spaceBelow = window.innerHeight - rootRect.bottom - viewportPadding;
  const spaceAbove = rootRect.top - viewportPadding;
  const shouldOpenBottom = spaceBelow >= desiredHeight + gap || spaceBelow >= spaceAbove;
  const maxHeight = Math.min(328, Math.max((shouldOpenBottom ? spaceBelow : spaceAbove) - gap, 160));
  const left = Math.min(Math.max(rootRect.left, viewportPadding), window.innerWidth - viewportPadding - rootRect.width);
  const top = shouldOpenBottom
    ? rootRect.bottom + gap
    : Math.max(viewportPadding, rootRect.top - gap - Math.min(desiredHeight, maxHeight));

  return {
    placement: shouldOpenBottom ? "bottom" : "top",
    geometry: {
      left,
      top,
      width: rootRect.width,
      maxHeight,
    },
  };
}

export default function AppSelect({
  label,
  options,
  placeholder = "Chọn 1 giá trị",
  searchPlaceholder = "Tìm kiếm",
  name,
  value,
  defaultValue = "",
  disabled,
  error,
  errorClassName,
  required,
  containerClassName,
  labelClassName,
  selectClassName,
  menuClassName,
  endAdornment,
  onBlur,
  onChange,
}: AppSelectProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedValue = isControlled ? value : internalValue;
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [menuPlacement, setMenuPlacement] = useState<MenuPlacement>("bottom");
  const [menuGeometry, setMenuGeometry] = useState<MenuGeometry | null>(null);
  const [isMenuMeasured, setIsMenuMeasured] = useState(false);
  const deferredSearch = useDeferredValue(search);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue]
  );

  const normalizedQuery = deferredSearch.trim().toLowerCase();

  const filteredOptions = useMemo(() => {
    if (!normalizedQuery) {
      return options;
    }

    return options.filter((option) => {
      const haystacks = [option.label, option.value, ...(option.keywords ?? [])].map((item) => item.toLowerCase());

      return haystacks.some((item) => item.includes(normalizedQuery));
    });
  }, [normalizedQuery, options]);

  const closeMenu = () => {
    setIsOpen(false);
    setSearch("");
    setMenuGeometry(null);
    setIsMenuMeasured(false);
    onBlur?.();
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const updateMenuGeometry = () => {
      const rootElement = rootRef.current;

      if (!rootElement) {
        return;
      }
      const { placement, geometry } = resolveMenuGeometry(rootElement);
      setMenuPlacement(placement);
      setMenuGeometry(geometry);
    };

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (!rootRef.current?.contains(target) && !menuRef.current?.contains(target)) {
        closeMenu();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    const onViewportChange = () => {
      updateMenuGeometry();
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onViewportChange);
    window.addEventListener("scroll", onViewportChange, true);

    const frame = requestAnimationFrame(() => {
      updateMenuGeometry();
      searchInputRef.current?.focus();
    });

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onViewportChange);
      window.removeEventListener("scroll", onViewportChange, true);
    };
  }, [closeMenu, isOpen]);

  useLayoutEffect(() => {
    if (!isOpen || !menuGeometry || !rootRef.current || !menuRef.current) {
      return;
    }

    const measuredHeight = Math.min(menuRef.current.offsetHeight, 328);
    const { placement, geometry } = resolveMenuGeometry(rootRef.current, measuredHeight);

    if (placement !== menuPlacement) {
      setMenuPlacement(placement);
    }

    if (!isSameGeometry(menuGeometry, geometry)) {
      setMenuGeometry(geometry);
      return;
    }

    if (!isMenuMeasured) {
      setIsMenuMeasured(true);
    }
  }, [filteredOptions.length, isMenuMeasured, isOpen, menuGeometry, menuPlacement]);

  const handleSelect = (nextValue: string) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
    closeMenu();
  };

  const menu =
    typeof document !== "undefined" && isOpen && menuGeometry
      ? createPortal(
          <div
            ref={menuRef}
            className={clsx(
              "fixed z-100 overflow-hidden rounded-2xl border border-white/12 bg-app-primary-700 shadow-[0_20px_48px_rgba(2,49,25,0.32)] transition-all duration-200",
              menuPlacement === "top" ? "origin-bottom" : "origin-top",
              isMenuMeasured ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none opacity-0",
              menuClassName
            )}
            style={{
              left: menuGeometry.left,
              top: menuGeometry.top,
              width: menuGeometry.width,
            }}
          >
            <div className={clsx("border-b border-white/10 p-3")}>
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={searchPlaceholder}
                className={clsx(
                  "h-11 w-full rounded-xl border border-white/12 bg-white/8 px-4",
                  "text-body-sm-medium text-white placeholder:text-white/45 outline-none",
                  "transition-colors focus:border-white/24"
                )}
              />
            </div>

            <div className={clsx("overflow-y-auto p-2")} style={{ maxHeight: menuGeometry.maxHeight }}>
              {filteredOptions.length ? (
                filteredOptions.map((option) => {
                  const isSelected = option.value === selectedValue;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      className={clsx(
                        "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-body-sm-medium transition-colors",
                        isSelected ? "bg-app-primary-25 text-app-neutral-950" : "text-white/88 hover:bg-white/8"
                      )}
                    >
                      <span>{option.label}</span>
                      {isSelected ? <span className={clsx("text-body-xs-bold text-app-primary-600")}>Chọn</span> : null}
                    </button>
                  );
                })
              ) : (
                <div className={clsx("px-4 py-6 text-center text-body-sm-medium text-white/55")}>
                  Không tìm thây lựa chọn phù hợp.
                </div>
              )}
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <div className={clsx("flex flex-col gap-1.5", containerClassName)}>
      <div
        ref={rootRef}
        className={clsx(
          "relative rounded-2xl border border-white/18 bg-app-primary-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-200",
          "hover:border-white/24",
          "focus-within:border-white/30",
          "focus-within:shadow-[0_14px_36px_rgba(2,49,25,0.28),inset_0_1px_0_rgba(255,255,255,0.05)]",
          isOpen && "border-white/30 shadow-[0_14px_36px_rgba(2,49,25,0.28),inset_0_1px_0_rgba(255,255,255,0.05)]",
          error && "border-app-red-300/80 focus-within:border-app-red-300 hover:border-app-red-300/90",
          disabled && "opacity-70"
        )}
      >
        {name ? <input type="hidden" name={name} value={selectedValue} required={required} /> : null}

        <button
          type="button"
          disabled={disabled}
          aria-expanded={isOpen}
          aria-invalid={Boolean(error)}
          onClick={() =>
            isOpen
              ? closeMenu()
              : (() => {
                  if (rootRef.current) {
                    setIsMenuMeasured(false);
                    const { placement, geometry } = resolveMenuGeometry(rootRef.current);
                    setMenuPlacement(placement);
                    setMenuGeometry(geometry);
                  }
                  setIsOpen(true);
                })()
          }
          className={clsx("flex h-16.5 w-full flex-col items-start gap-1 px-5 py-3.25 text-left")}
        >
          <span className={clsx("text-xxs font-semibold text-white", labelClassName)}>{label}</span>

          <span
            className={clsx(
              "flex w-full items-center justify-between gap-4 text-body-sm-medium text-white",
              !selectedOption && "text-white/58",
              selectClassName
            )}
          >
            <span className={clsx("truncate")}>{selectedOption?.label ?? placeholder}</span>

            <span className={clsx("shrink-0 transition-transform duration-200")}>
              {endAdornment ?? <SelectedIcon className={clsx(isOpen && "text-app-primary-500")} />}
            </span>
          </span>
        </button>

        {menu}
      </div>

      {error ? <p className={clsx("px-2 text-body-xs-medium text-app-red-300", errorClassName)}>{error}</p> : null}
    </div>
  );
}

"use client";

import clsx from "clsx";
import Link from "next/link";
import { useCallback } from "react";
import AppBorderRadius from "@/shared/ui/app-border-radius";
import PdfFileIcon from "@/assets/icons/pdf-file.svg";
import DownloadIcon from "@/assets/icons/dowload.svg";
import type { InvestorDocumentItem } from "@/app/sections/investor-materials/data";

type InvestorMaterialsDocumentItemProps = {
  item: InvestorDocumentItem;
};

const EXTENSION_MAP: Record<string, string> = {
  "application/pdf": ".pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx",
  "application/vnd.ms-excel": ".xls",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
  "application/zip": ".zip",
  "text/plain": ".txt",
  "text/csv": ".csv",
  "image/png": ".png",
  "image/jpeg": ".jpg",
};

function getExtension(response: Response, url: string) {
  const disposition = response.headers.get("Content-Disposition");
  if (disposition) {
    const match = disposition.match(/filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/);
    const name = match?.[1] || match?.[2];
    if (name) {
      const ext = name.includes(".") ? "." + name.split(".").pop() : "";
      if (ext) return ext;
    }
  }

  const contentType = response.headers.get("Content-Type")?.split(";")[0];
  if (contentType && EXTENSION_MAP[contentType]) return EXTENSION_MAP[contentType];

  const urlExt = url.match(/\.(\w+)(?:\?|$)/);
  if (urlExt) return "." + urlExt[1];

  return "";
}

async function downloadFile(url: string, filename: string) {
  try {
    const response = await fetch(url);
    const ext = getExtension(response, url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `${filename}${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch {
    window.open(url, "_blank");
  }
}

export default function InvestorMaterialsDocumentItem({ item }: InvestorMaterialsDocumentItemProps) {
  const handleDownload = useCallback(() => {
    downloadFile(item.downloadHref, item.title);
  }, [item.downloadHref, item.title]);

  return (
    <AppBorderRadius
      cornerRadius={12}
      classNameContainer={clsx(
        "drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-shadow duration-200",
        "hover:drop-shadow-[0_10px_24px_rgba(15,23,42,0.12)]"
      )}
    >
      <div className={clsx("flex items-center gap-4 bg-white p-3 transition-colors xl:px-4 xl:py-3")}>
        <Link href={item.href} target="_blank" className="flex min-w-0 flex-1 items-center gap-4">
          <PdfFileIcon className={clsx("w-10 h-10.5 shrink-0")} />
          <div className="min-w-0 flex flex-col gap-1 flex-1">
            <p
              className={clsx(
                "text-body-base-medium text-app-neutral-950 truncate",
                "leading-5 xl:leading-6 text-sm xl:text-base"
              )}
            >
              {item.title}
            </p>
            <p
              className={clsx(
                "text-body-sm-medium text-app-neutral-500",
                "font-normal xl:font-medium leading-4 xl:leading-5",
                "text-xs xl:text-sm"
              )}
            >
              {item.subtitle}
            </p>
          </div>
        </Link>
        <AppBorderRadius cornerRadius={50}>
          <button
            type="button"
            onClick={handleDownload}
            className={clsx(
              "flex size-8 shrink-0 items-center justify-center bg-app-neutral-100 text-app-neutral-400",
              "transition-colors duration-200 hover:bg-app-primary-500 hover:text-white"
            )}
          >
            <DownloadIcon />
          </button>
        </AppBorderRadius>
      </div>
    </AppBorderRadius>
  );
}

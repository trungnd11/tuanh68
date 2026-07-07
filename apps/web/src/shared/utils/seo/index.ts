import { appConfig } from "@/shared/config/app";
import type { DynamicSeoParams, GenerateSeoParams } from "@/shared/utils/seo/types";
import type { Metadata } from "next";

const SITE_NAME = appConfig.siteName;
const DEFAULT_IMAGE_PATH = "/images/seo-default.jpg";

function normalizePath(path: string): string {
  if (!path) {
    return "/";
  }

  const normalizedPath = path.replace(/^\/+/, "").replace(/\/{2,}/g, "/");

  return `/${normalizedPath}`;
}

function normalizeMetadataUrl(value: string): string {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return normalizePath(value);
}

export function generateSeoMetadata({
  title,
  description,
  path,
  image = DEFAULT_IMAGE_PATH,
  keywords = [],
}: GenerateSeoParams): Metadata {
  const normalizedPath = normalizePath(path);
  const normalizedImage = normalizeMetadataUrl(image);

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: normalizedPath,
    },

    openGraph: {
      title,
      description,
      url: normalizedPath,
      siteName: SITE_NAME,
      locale: "vi_VN",
      type: "website",

      images: [
        {
          url: normalizedImage,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [normalizedImage],
    },
  };
}

export function generateDynamicSeoMetadata({ title, description, slug, prefix, image }: DynamicSeoParams): Metadata {
  return generateSeoMetadata({
    title,
    description,
    path: `${normalizePath(prefix)}/${slug.replace(/^\/+/, "")}`,
    image,
  });
}

export async function buildSeoMetadata<T>(
  fetcher: () => Promise<T>,
  mapper: (data: T) => {
    title: string;
    description: string;
    path: string;
    image?: string;
  }
): Promise<Metadata> {
  const data = await fetcher();

  const seo = mapper(data);

  return generateSeoMetadata(seo);
}

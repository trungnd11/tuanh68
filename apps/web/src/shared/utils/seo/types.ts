export interface GenerateSeoParams {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
}

export interface DynamicSeoParams {
  title: string;
  description: string;
  slug: string;
  prefix: string;
  image?: string;
}

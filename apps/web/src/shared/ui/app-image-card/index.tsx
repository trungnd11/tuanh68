import Image from "next/image";
import type { ReactNode } from "react";

type AppImageCardProps = {
  src: string;
  alt: string;
  children?: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  sizes?: string;
};

export default function AppImageCard({
  src,
  alt,
  children,
  title,
  description,
  className = "",
  titleClassName = "text-[18px] leading-[24px] font-bold sm:text-[20px] sm:leading-[28px]",
  sizes = "(min-width: 1024px) 25vw, 100vw",
}: AppImageCardProps) {
  return (
    <article className={`relative min-h-[220px] overflow-hidden rounded-[12px] shadow-lg ${className}`.trim()}>
      <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      {(children || title || description) && (
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-[18px] sm:p-6">
          {title && <h3 className={`text-white ${titleClassName}`}>{title}</h3>}
          {description && <p className="text-[14px] leading-[20px] text-app-neutral-300">{description}</p>}
          {children}
        </div>
      )}
    </article>
  );
}

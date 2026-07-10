import clsx from "clsx";
import Image from "next/image";
import IconCart from "@/assets/icons/icon-cart.svg";
import IconDocumentOutline from "@/assets/icons/icon-document-outline.svg";
import IconGreenDot from "@/assets/icons/icon-green-dot.svg";
import { productsHeroContent } from "./content";

type Product = (typeof productsHeroContent.products)[number];

export default function ProductCard({ product }: { product: Product }) {
  const borderClass = product.isPremium ? "border-[rgba(41,115,178,0.3)]" : "border-gray-100";
  const statBg = product.isPremium ? "bg-[rgba(41,115,178,0.05)]" : "bg-[#f9fafb]";
  const statBorder = product.isPremium ? "border border-[rgba(41,115,178,0.2)]" : "border-0";
  const statValueColor = product.isPremium ? "text-[#2973b2]" : "text-[#333]";

  return (
    <div
      className={clsx(
        "relative flex flex-col overflow-hidden rounded-2xl border bg-white",
        "shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]",
        borderClass,
        " ",
        product.isPremium ? "p-px" : "pb-1.25 pt-px px-px"
      )}
    >
      {product.hotSale && (
        <div className={clsx("absolute right-0 top-0 z-10")}>
          <div
            className={clsx("flex h-7 w-[108.41px] items-center bg-[#b20000] px-5 py-1.5")}
            style={{
              maskImage: "url(/assets/products/catalog/badge-ribbon-bg.png)",
              maskSize: "108.41px 28px",
              maskRepeat: "no-repeat",
              WebkitMaskImage: "url(/assets/products/catalog/badge-ribbon-bg.png)",
              WebkitMaskSize: "108.41px 28px",
              WebkitMaskRepeat: "no-repeat",
            }}
          >
            <span className={clsx("text-xs font-black uppercase leading-4 tracking-[0.3px] text-white")}>BÁN CHẠY</span>
          </div>
        </div>
      )}

      <div className={clsx("relative h-48 w-full shrink-0 overflow-hidden sm:h-56")}>
        <div className={clsx("relative h-full w-full overflow-hidden rounded-[inherit]")}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={clsx("object-cover")}
            sizes="(min-width: 1024px) 33vw, 50vw"
          />
          <div
            className={clsx(
              "absolute left-3 top-3 z-2 max-w-[calc(100%-128px)] truncate rounded-full px-3 py-[3.5px]",
              "text-xs font-bold uppercase leading-4 text-white sm:left-4 sm:top-4.5"
            )}
            style={{ background: product.badge.color }}
          >
            {product.badge.label}
          </div>

          {product.inStock && (
            <div
              className={clsx(
                "absolute right-3 top-3 z-2 flex items-center gap-1 rounded-full",
                "bg-[#7a9c59] px-3 py-1 sm:right-4 sm:top-4"
              )}
            >
              <IconGreenDot className={clsx("size-1.5 shrink-0")} />
              <span className={clsx("text-xs font-bold leading-4 text-white")}>Còn hàng</span>
            </div>
          )}

          {product.hotTag && (
            <div
              className={clsx(
                "absolute right-3 top-3 z-2 flex items-center gap-1 rounded-full",
                "bg-[#b20000] px-3 py-1 sm:right-4 sm:top-4"
              )}
            >
              <Image
                src="/assets/products/catalog/icon-chevron-right.png"
                alt=""
                width={9}
                height={10}
                className={clsx("h-2.5 w-2.25")}
              />
              <span className={clsx("text-xs font-bold leading-4 text-white")}>Hot</span>
            </div>
          )}

          <div
            className={clsx(
              "absolute bottom-0 left-0 right-0 flex min-h-20 items-end bg-linear-to-t",
              "from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0)] px-4 pb-3 sm:px-5"
            )}
          >
            <div className={clsx("flex flex-wrap items-start gap-1.5 sm:gap-2")}>
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className={clsx(
                    "rounded bg-[rgba(255,255,255,0.2)] px-2 py-1 text-xs font-medium",
                    "leading-4 text-white backdrop-blur-[2px]"
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className={clsx("flex w-full flex-col gap-[10.8px] p-4 sm:p-6")}
        style={product.isPremium ? { borderTop: "2px solid #2973b2" } : undefined}
      >
        <div className={clsx("flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between")}>
          <div className={clsx("flex min-w-0 flex-col gap-0.5")}>
            <h3 className={clsx("text-xl font-black leading-7 text-[#333]")}>{product.name}</h3>
            <span className={clsx("text-sm font-medium leading-5 text-app-brand-teal")}>{product.subName}</span>
          </div>
          <div className={clsx("flex shrink-0 flex-col sm:items-end")}>
            <span className={clsx("text-lg font-black leading-7 text-[#2973b2] sm:text-right")}>Liên hệ</span>
            <span className={clsx("text-xs font-normal leading-4 text-gray-400 sm:text-right")}>để có giá tốt</span>
          </div>
        </div>

        <p className={clsx("w-full text-sm font-normal leading-[22.75px] text-gray-500")}>
          {product.description[0]}
          <br />
          {product.description[1]}
          <br />
          {product.description[2]}
        </p>

        <div className={clsx("grid w-full grid-cols-3 gap-2 pt-[9.2px]")}>
          {product.specs.map((spec) => (
            <div
              key={spec.label}
              className={clsx("flex min-w-0 flex-col items-start rounded-lg ", statBg, " ", statBorder, " p-2")}
            >
              <span className={clsx("w-full text-center text-sm font-bold leading-5 ", statValueColor)}>
                {spec.value}
              </span>
              <span className={clsx("w-full text-center text-xs font-normal leading-4 text-gray-400")}>
                {spec.label}
              </span>
            </div>
          ))}
        </div>

        <div className={clsx("grid w-full grid-cols-1 gap-3 pt-[9.2px] sm:grid-cols-2")}>
          <a
            href="#"
            className={clsx(
              "flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#2973b2] px-0",
              "text-sm font-bold uppercase leading-5 tracking-[0.35px] text-white"
            )}
          >
            <IconCart className={clsx("h-3 w-[13.5px] shrink-0")} />
            <span>ĐẶT MUA</span>
          </a>
          <a
            href="#"
            className={clsx(
              "flex h-11 w-full items-center justify-center gap-2 rounded-lg border-2",
              "border-app-brand-teal bg-transparent px-0 text-sm font-bold uppercase",
              "leading-5 tracking-[0.35px] text-app-brand-teal"
            )}
          >
            <IconDocumentOutline className={clsx("h-3 w-[9px] shrink-0")} />
            <span>BÁO GIÁ</span>
          </a>
        </div>
      </div>
    </div>
  );
}

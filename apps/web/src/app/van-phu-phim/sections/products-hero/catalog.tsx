import Image from "next/image";
import Link from "next/link";
import { catalogContent } from "./catalog-content";

function ProductCard({ product, index }: { product: (typeof catalogContent.products)[number]; index: number }) {
  const borderClass = product.isPremium ? "border-[rgba(41,115,178,0.3)]" : "border-[#f3f4f6]";
  const statBg = product.isPremium ? "bg-[rgba(41,115,178,0.05)]" : "bg-[#f9fafb]";
  const statBorder = product.isPremium ? "border-[rgba(41,115,178,0.2)]" : "border-transparent";
  const statValueColor = product.isPremium ? "text-[#2973b2]" : "text-[#333]";

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-[16px] border bg-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] ${borderClass} ${product.isPremium ? "p-px" : "pb-[5px] pt-px px-px"}`}
    >
      {product.hotSale && (
        <div className="absolute right-0 top-0 z-10">
          <div
            className="flex h-7 w-[108.41px] items-center bg-[#b20000] px-5 py-1.5"
            style={{
              maskImage: "url(/assets/products/catalog/badge-ribbon-bg.png)",
              maskSize: "108.41px 28px",
              maskRepeat: "no-repeat",
              WebkitMaskImage: "url(/assets/products/catalog/badge-ribbon-bg.png)",
              WebkitMaskSize: "108.41px 28px",
              WebkitMaskRepeat: "no-repeat",
            }}
          >
            <span className="text-[12px] font-black uppercase leading-4 tracking-[0.3px] text-white">BÁN CHẠY</span>
          </div>
        </div>
      )}

      <div className="relative h-56 w-full shrink-0 overflow-hidden">
        <div className="relative h-full w-full overflow-hidden rounded-[inherit]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, 50vw"
          />
          <div
            className="absolute left-4 top-4.5 z-2 rounded-[9999px] px-3 py-[3.5px] text-[12px] font-bold uppercase leading-4 text-white"
            style={{ background: product.badge.color }}
          >
            {product.badge.label}
          </div>

          {product.inStock && (
            <div className="absolute right-4 top-4 z-2 flex items-center gap-1 rounded-[9999px] bg-[#7a9c59] px-3 py-1">
              <Image
                src="/assets/products/catalog/icon-green-dot.png"
                alt=""
                width={6}
                height={6}
                className="size-1.5"
              />
              <span className="text-[12px] font-bold leading-4 text-white">Còn hàng</span>
            </div>
          )}

          {product.hotTag && (
            <div className="absolute right-4 top-4 z-2 flex items-center gap-1 rounded-[9999px] bg-[#b20000] px-3 py-1">
              <Image
                src="/assets/products/catalog/icon-chevron-right.png"
                alt=""
                width={8.75}
                height={10}
                className="h-2.5 w-[8.75px]"
              />
              <span className="text-[12px] font-bold leading-4 text-white">Hot</span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 flex h-20 items-end bg-linear-to-t from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0)] pb-3 pl-5 pr-5">
            <div className="flex items-start gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-[4px] bg-[rgba(255,255,255,0.2)] px-2 py-1 text-[12px] font-medium leading-4 text-white backdrop-blur-[2px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`flex w-full flex-col gap-[10.8px] p-[24px] ${product.isPremium ? "" : ""}`}
        style={product.isPremium ? { borderTop: "2px solid #2973b2" } : undefined}
      >
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-[2px]">
            <h3 className="text-[20px] font-black leading-[28px] text-[#333]">{product.name}</h3>
            <span className="text-[14px] font-medium leading-[20px] text-app-brand-teal">{product.subName}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-right text-[18px] font-black leading-[28px] text-[#2973b2]">Liên hệ</span>
            <span className="text-right text-[12px] font-normal leading-[16px] text-[#9ca3af]">để có giá tốt</span>
          </div>
        </div>

        <p className="w-full text-[14px] font-normal leading-[22.75px] text-[#6b7280]">
          {product.description[0]}
          <br />
          {product.description[1]}
          <br />
          {product.description[2]}
        </p>

        <div className="flex w-full items-start justify-center gap-[8px] pt-[9.2px]">
          {product.specs.map((spec) => (
            <div
              key={spec.label}
              className={`flex min-w-px flex-1 flex-col items-start rounded-[8px] border p-[8px] ${statBg} ${statBorder}`}
            >
              <span className={`w-full text-center text-[14px] font-bold leading-[20px] ${statValueColor}`}>
                {spec.value}
              </span>
              <span className="w-full text-center text-[12px] font-normal leading-[16px] text-[#9ca3af]">
                {spec.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex w-full items-start justify-center gap-[12px] pt-[9.2px]">
          <Link
            href="#"
            className="flex w-[159px] items-center justify-center gap-[8px] rounded-[8px] bg-[#2973b2] pb-[12.5px] pt-[11.5px] text-[14px] font-bold uppercase tracking-[0.35px] text-white no-underline"
          >
            <Image
              src="/assets/products/catalog/icon-cart.png"
              alt=""
              width={13.5}
              height={12}
              className="h-3 w-[13.5px]"
            />
            <span>ĐẶT MUA</span>
          </Link>
          <Link
            href="#"
            className="flex w-[163px] items-center justify-center gap-[8px] rounded-[8px] border-2 border-app-brand-teal py-[12px] text-[14px] font-bold uppercase tracking-[0.35px] text-app-brand-teal no-underline"
          >
            <Image
              src="/assets/products/catalog/icon-document-teal.png"
              alt=""
              width={9}
              height={12}
              className="h-3 w-[9px]"
            />
            <span>BÁO GIÁ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProductsCatalogSection() {
  return (
    <section className="flex flex-col items-start bg-white px-[80px] py-[80px] max-lg:px-[32px]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start gap-[48px] px-[32px]">
        <div className="flex w-full flex-col items-center gap-[14.9px]">
          <div className="flex w-full items-center justify-center gap-[12px]">
            <div className="h-[2px] w-[40px] bg-app-brand-teal" />
            <span className="text-center text-[14px] font-semibold uppercase tracking-[1.4px] text-app-brand-teal">
              {catalogContent.badge}
            </span>
            <div className="h-[2px] w-[40px] bg-app-brand-teal" />
          </div>
          <h2 className="w-full pt-[1.1px] text-center text-[36px] font-black uppercase leading-[40px] text-[#333]">
            {catalogContent.titleParts[0]}
            <span className="text-[#2973b2]">{catalogContent.titleParts[1]}</span>
          </h2>
          <p className="w-full max-w-[576px] pb-[0.625px] text-center text-[14px] font-normal leading-[22.75px] text-[#6b7280]">
            {catalogContent.description[0]}
            <br />
            {catalogContent.description[1]}
          </p>
        </div>

        <div className="flex w-full items-start justify-center gap-[12px] pt-[8px] max-md:flex-wrap">
          {catalogContent.filterButtons.map((btn, i) => (
            <button
              key={btn}
              className={`cursor-pointer rounded-[9999px] border px-[25px] py-[11px] text-center text-[14px] font-semibold uppercase tracking-[0.35px] ${
                i === 0 ? "border-[#2973b2] bg-[#2973b2] text-white" : "border-[#d1d5db] text-[#4b5563]"
              }`}
            >
              {btn}
            </button>
          ))}
        </div>

        <div className="grid w-full grid-cols-3 gap-x-[32px] gap-y-[32px] max-lg:grid-cols-2 max-md:grid-cols-1">
          {catalogContent.products.map((product, index) => (
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

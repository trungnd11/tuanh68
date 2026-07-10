import clsx from "clsx";
import AppContainer from "@/shared/ui/app-container";
import AppSectionBadge from "@/shared/ui/app-section-badge";
import { productsHeroContent } from "./content";
import ProductCard from "./product-card";

export default function ProductsHeroSection() {
  return (
    <section id={productsHeroContent.id} className={clsx("bg-white py-6 lg:py-20")}>
      <AppContainer className={clsx("flex flex-col items-start gap-6 lg:gap-12")}>
        <div className={clsx("flex w-full flex-col items-center gap-3 lg:gap-4")}>
          <AppSectionBadge centered>{productsHeroContent.badge}</AppSectionBadge>
          <h2
            className={clsx(
              "w-full text-center text-2xl font-black uppercase leading-8",
              "text-[#333] sm:text-[28px] sm:leading-9 lg:text-4xl lg:leading-10"
            )}
          >
            {productsHeroContent.titleParts[0]}
            <span className={clsx("text-[#2973b2]")}>{productsHeroContent.titleParts[1]}</span>
          </h2>
          <p
            className={clsx(
              "w-full max-w-xl text-center text-sm font-normal leading-[22.75px]",
              "text-gray-500 lg:text-base lg:leading-7"
            )}
          >
            {productsHeroContent.description[0]}
            <br />
            {productsHeroContent.description[1]}
          </p>
        </div>

        <div className={clsx("flex w-full flex-wrap items-start justify-center gap-2 pt-2 lg:gap-3")}>
          {productsHeroContent.filterButtons.map((btn, i) => (
            <button
              key={btn}
              className={clsx(
                "cursor-pointer rounded-full border px-4 py-2 text-center sm:px-6.25 sm:py-2.75",
                "text-xs font-semibold uppercase leading-5 tracking-[0.35px] sm:text-sm",
                i === 0 ? "border-[#2973b2] bg-[#2973b2] text-white" : "border-gray-300 text-gray-600"
              )}
            >
              {btn}
            </button>
          ))}
        </div>

        <div className={clsx("grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8")}>
          {productsHeroContent.products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </AppContainer>
    </section>
  );
}

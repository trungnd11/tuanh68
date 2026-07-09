import Image from "next/image";
import AppContainer from "@/shared/ui/app-container";
import AppSectionHeading from "@/shared/ui/app-section-heading";
import AppImageCard from "@/shared/ui/app-image-card";
import AppButton from "@/shared/ui/app-button";
import { productsContent } from "./content";

export default function ProductsSection() {
  const [factoryCard, interiorCard, scaffoldingCard] = productsContent.cards;

  return (
    <section id={productsContent.id} className="bg-white py-14 sm:py-20">
      <AppContainer className="flex flex-col gap-10 sm:gap-16">
        <AppSectionHeading>{productsContent.title}</AppSectionHeading>

        <div className="grid gap-4 lg:grid-cols-4 lg:grid-rows-[300px_300px]">
          <article className="relative min-h-[420px] overflow-hidden rounded-[12px] shadow-lg lg:col-span-2 lg:row-span-2 lg:min-h-0">
            <Image
              src={productsContent.featured.image}
              alt={productsContent.featured.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 px-5 pt-6 pb-5 sm:px-8 sm:pt-[34px] sm:pb-8">
              <span className="rounded-[2px] bg-app-brand-teal px-3 py-1 text-[12px] leading-[16px] font-bold text-white">
                {productsContent.featured.badge}
              </span>
              <h3 className="pt-1 text-[26px] leading-[32px] font-bold text-white sm:text-[30px] sm:leading-[36px]">
                {productsContent.featured.title}
              </h3>
              <p className="text-[14px] leading-[20px] text-app-neutral-300 sm:text-[16px] sm:leading-[24px]">
                {productsContent.featured.description}
              </p>
              <AppButton href={productsContent.featured.href} variant="ghost" className="mt-1 sm:mt-2">
                <span>{productsContent.featured.cta}</span>
                <Image src="/assets/products/arrow-right.png" alt="" width={14} height={16} className="h-4 w-[14px]" />
              </AppButton>
            </div>
          </article>

          <AppImageCard
            src={factoryCard.image}
            alt={factoryCard.title}
            title={factoryCard.title}
            description={factoryCard.description}
          />

          <article className="flex min-h-[220px] flex-col items-center justify-center rounded-[12px] bg-app-accent-blue px-5 py-6 text-center shadow-lg sm:min-h-[300px] sm:px-6">
            <Image
              src={productsContent.process.icon}
              alt=""
              width={27}
              height={36}
              className="mb-4 h-9 w-[27px] sm:mb-[18px]"
            />
            <h3 className="mb-2 text-[18px] leading-[24px] font-bold text-white sm:text-[20px] sm:leading-[28px]">
              {productsContent.process.title}
            </h3>
            <p className="text-[14px] leading-[20px] text-app-blue-200">
              {productsContent.process.description[0]}
              <br />
              {productsContent.process.description[1]}
            </p>
          </article>

          <AppImageCard
            src={interiorCard.image}
            alt={interiorCard.title}
            title={interiorCard.title}
            description={interiorCard.description}
          />

          <AppImageCard
            src={scaffoldingCard.image}
            alt={scaffoldingCard.title}
            title={scaffoldingCard.title}
            description={scaffoldingCard.description}
          />
        </div>
      </AppContainer>
    </section>
  );
}

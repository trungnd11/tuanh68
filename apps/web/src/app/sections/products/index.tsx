import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import AppContainer from "@/shared/ui/app-container";
import AppSectionHeading from "@/shared/ui/app-section-heading";
import AppScrollReveal from "@/shared/ui/app-scroll-reveal";
import AppImageCard from "@/shared/ui/app-image-card";
import { productsContent } from "./content";

export default function ProductsSection() {
  const [factoryCard, interiorCard, scaffoldingCard] = productsContent.cards;

  return (
    <section id={productsContent.id} className={clsx("bg-white py-6 lg:py-20")}>
      <AppContainer className={clsx("flex flex-col gap-6 lg:gap-10")}>
        <AppScrollReveal variant="fade-in-up" delayMs={100}>
          <AppSectionHeading>{productsContent.title}</AppSectionHeading>
        </AppScrollReveal>

        <div className={clsx("grid gap-4 lg:grid-cols-2")}>
          <AppImageCard
            src={productsContent.featured.image}
            alt={productsContent.featured.title}
            badge={productsContent.featured.badge}
            title={productsContent.featured.title}
            description={productsContent.featured.description}
            className={clsx("h-100! lg:h-154! shadow-lg lg:row-span-2")}
            sizes="(min-width: 1024px) 50vw, 100vw"
            titleClassName="pt-1 text-[26px] leading-8 font-bold lg:text-[30px] lg:leading-9"
          >
            <Link
              href={productsContent.featured.href}
              className={clsx("mt-1 sm:mt-2 text-white inline-flex items-center gap-2")}
            >
              <span>{productsContent.featured.cta}</span>
              <Image
                src="/assets/products/arrow-right.png"
                alt=""
                width={14}
                height={16}
                className={clsx("h-4 w-3.5")}
              />
            </Link>
          </AppImageCard>

          <div className={clsx("grid lg:grid-cols-2 gap-4 auto-rows-75")}>
            <AppScrollReveal variant="fade-in-up" delayMs={200}>
              <AppImageCard
                src={factoryCard.image}
                alt={factoryCard.title}
                title={factoryCard.title}
                description={factoryCard.description}
              />
            </AppScrollReveal>

            <AppScrollReveal variant="fade-in-up" delayMs={300}>
              <AppImageCard
                src={interiorCard.image}
                alt={interiorCard.title}
                title={interiorCard.title}
                description={interiorCard.description}
              />
            </AppScrollReveal>

            <AppScrollReveal variant="fade-in-up" delayMs={400}>
              <AppImageCard
                src={interiorCard.image}
                alt={interiorCard.title}
                title={interiorCard.title}
                description={interiorCard.description}
              />
            </AppScrollReveal>

            <AppScrollReveal variant="fade-in-up" delayMs={500}>
              <AppImageCard
                src={scaffoldingCard.image}
                alt={scaffoldingCard.title}
                title={scaffoldingCard.title}
                description={scaffoldingCard.description}
              />
            </AppScrollReveal>
          </div>
        </div>
      </AppContainer>
    </section>
  );
}

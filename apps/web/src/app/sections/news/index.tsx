import AppContainer from "@/shared/ui/app-container";
import AppSectionHeading from "@/shared/ui/app-section-heading";
import AppNewsCard from "@/shared/ui/app-news-card";
import { newsContent } from "./content";

export default function NewsSection() {
  return (
    <section id={newsContent.id} className="border-t border-solid border-[#e5e7eb] bg-[#f8f9fa] pb-[80px] pt-[81px]">
      <AppContainer className="flex flex-col gap-[48px]">
        <AppSectionHeading>{newsContent.heading}</AppSectionHeading>
        <div className="grid gap-[32px] md:grid-cols-2 lg:grid-cols-3">
          {newsContent.cards.map((card) => (
            <AppNewsCard
              key={card.id}
              src={card.src}
              alt={card.alt}
              category={card.category}
              categoryBg={card.categoryBg}
              title={card.title}
              description={card.description}
              href={card.href}
            />
          ))}
        </div>
      </AppContainer>
    </section>
  );
}

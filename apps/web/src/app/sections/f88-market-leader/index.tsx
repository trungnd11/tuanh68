import clsx from "clsx";
import AppContent from "@/shared/ui/app-content";
import MarketLeaderHeading from "@/app/sections/f88-market-leader/components/market-leader-heading";
import MarketLeaderHighlights from "@/app/sections/f88-market-leader/components/market-leader-highlights";
import MarketLeaderDetails from "@/app/sections/f88-market-leader/components/market-leader-details";
import MarketLeaderEcosystem from "@/app/sections/f88-market-leader/components/market-leader-ecosystem";
import { appSectionIds } from "@/shared/config/app";

export default function F88MarketLeaderSection() {
  return (
    <section id={appSectionIds.f88MarketLeader} className={clsx("pt-11 xl:pt-20 xl:pb-18")}>
      <AppContent className={clsx("flex flex-col gap-8 xl:gap-11 px-0! md:px-6 xl:px-0")}>
        <MarketLeaderHeading />
        <div className="flex flex-col gap-3 xl:gap-5">
          <MarketLeaderHighlights />
          <MarketLeaderDetails />
        </div>
        <MarketLeaderEcosystem />
      </AppContent>
    </section>
  );
}

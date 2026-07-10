import clsx from "clsx";
import { applicationContent } from "./content";
import ApplicationCard from "./application-card";

export default function ApplicationGrid() {
  return (
    <div className={clsx("grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4")}>
      {applicationContent.cards.map((card) => (
        <ApplicationCard key={card.title} card={card} />
      ))}
    </div>
  );
}

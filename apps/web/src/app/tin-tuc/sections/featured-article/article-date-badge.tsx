import clsx from "clsx";

type Props = {
  day: string;
  month: string;
  year: string;
};

export default function ArticleDateBadge({ day, month, year }: Props) {
  return (
    <div
      className={clsx(
        "absolute left-[-24px] top-1/2 hidden -translate-y-1/2 flex-col",
        "items-center gap-0 rounded-[12px] bg-app-accent-blue px-0 pb-3 pt-4",
        "shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] lg:flex"
      )}
    >
      <div className={clsx("text-[24px] font-black leading-[24px] text-white")}>{day}</div>
      <div className={clsx("pt-1 text-[12px] font-semibold uppercase tracking-[0.6px] text-[#bfdbfe]")}>{month}</div>
      <div className={clsx("text-[12px] text-[#93c5fd]")}>{year}</div>
    </div>
  );
}

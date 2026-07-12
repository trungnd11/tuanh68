import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { sidebarContent } from "./content";

type TrendingItem = (typeof sidebarContent.trending.items)[number];

function SidebarTrendingItem(props: TrendingItem) {
  const { image, alt, category, categoryBg, title, date } = props;

  return (
    <Link href="#" className={clsx("group flex gap-3")}>
      <div className={clsx("size-[72px] shrink-0 overflow-clip rounded-[8px]")}>
        <Image
          src={image}
          alt={alt}
          width={72}
          height={72}
          className={clsx("size-full object-cover transition-transform duration-300", "group-hover:scale-105")}
        />
      </div>
      <div className={clsx("flex min-w-0 flex-1 flex-col justify-center gap-1")}>
        <div
          className={clsx(
            "inline-block w-fit rounded px-1.5 py-0.5 text-[10px] font-bold uppercase",
            "tracking-[0.5px] text-white"
          )}
          style={{ backgroundColor: categoryBg }}
        >
          {category}
        </div>
        <h5
          className={clsx(
            "text-[13px] font-bold leading-[18px] text-[#333] transition-colors",
            "group-hover:text-app-accent-blue"
          )}
        >
          {title.join(" ")}
        </h5>
        <div className={clsx("text-[11px] text-[#9ca3af]")}>{date}</div>
      </div>
    </Link>
  );
}

export default function SidebarTrending() {
  return (
    <div
      className={clsx(
        "rounded-[16px] bg-white p-6",
        "shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
      )}
    >
      <h4 className={clsx("mb-5 flex items-center gap-3 text-[14px] font-black uppercase", "text-[#333]")}>
        <div className={clsx("h-0.5 w-6 bg-app-brand-teal")} />
        {sidebarContent.trending.heading}
      </h4>
      <div className={clsx("flex flex-col gap-5")}>
        {sidebarContent.trending.items.map((item, i) => (
          <div key={i}>
            <SidebarTrendingItem {...item} />
            {i < sidebarContent.trending.items.length - 1 && <div className={clsx("mt-5 border-t border-[#f3f4f6]")} />}
          </div>
        ))}
      </div>
    </div>
  );
}

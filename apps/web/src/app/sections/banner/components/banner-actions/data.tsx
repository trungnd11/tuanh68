import clsx from "clsx";
import PlayIcon from "@/assets/icons/play.svg";
import { bannerActionItems } from "@/app/sections/banner/content";
import type { ListBannerActions } from "./types";

export const actions: ListBannerActions[] = bannerActionItems.map((action) => ({
  labelKey: action.labelKey,
  className: clsx(action.className),
  icon: "hasPlayIcon" in action && action.hasPlayIcon ? <PlayIcon className="size-6" /> : undefined,
}));

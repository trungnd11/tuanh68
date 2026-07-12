import clsx from "clsx";

type Props = {
  featuredBadge: string;
  featuredBadgeSub: string;
};

export default function ArticleBadges({ featuredBadge, featuredBadgeSub }: Props) {
  return (
    <div className={clsx("absolute left-4 top-4 flex gap-2")}>
      <div
        className={clsx(
          "flex items-center gap-1 rounded-[6px] bg-app-brand-teal px-3 py-1.5",
          "text-[12px] font-bold uppercase tracking-[1.2px] text-white",
          "shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
        )}
      >
        <svg width="13.5" height="12" viewBox="0 0 13.5 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.42734 0.421875C7.30313 0.164062 7.04062 0 6.75234 0C6.46406 0 6.20391 0.164062 6.07734 0.421875L4.57031 3.52266L1.20469 4.01953C0.923437 4.06172 0.689062 4.25859 0.602344 4.52812C0.515625 4.79766 0.585938 5.09531 0.7875 5.29453L3.22969 7.71094L2.65313 11.1258C2.60625 11.407 2.72344 11.693 2.95547 11.8594C3.1875 12.0258 3.49453 12.0469 3.74766 11.9133L6.75469 10.3078L9.76172 11.9133C10.0148 12.0469 10.3219 12.0281 10.5539 11.8594C10.7859 11.6906 10.9031 11.407 10.8562 11.1258L10.2773 7.71094L12.7195 5.29453C12.9211 5.09531 12.9938 4.79766 12.9047 4.52812C12.8156 4.25859 12.5836 4.06172 12.3023 4.01953L8.93437 3.52266L7.42734 0.421875Z"
            fill="white"
          />
        </svg>
        {featuredBadge}
      </div>
      <div
        className={clsx(
          "rounded-[6px] bg-app-accent-blue px-3 py-1.5 text-[12px] font-bold",
          "uppercase tracking-[1.2px] text-white",
          "shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
        )}
      >
        {featuredBadgeSub}
      </div>
    </div>
  );
}

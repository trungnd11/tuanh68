import clsx from "clsx";

export default function LoadMoreButton() {
  return (
    <div className={clsx("flex w-full items-center justify-center pt-0 sm:pt-4")}>
      <button
        className={clsx(
          "flex items-center gap-3 rounded-full bg-white px-10 py-3.5 text-sm",
          "font-bold uppercase leading-5 tracking-[0.35px] text-[#2973b2]",
          "shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
        )}
      >
        <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.5 1.5v11M1 7h11" stroke="#2973b2" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span>Xem thêm dự án</span>
      </button>
    </div>
  );
}

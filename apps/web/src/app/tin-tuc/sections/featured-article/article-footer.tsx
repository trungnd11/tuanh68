import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type Props = {
  authorAvatar: string;
  authorName: string;
};

export default function ArticleFooter({ authorAvatar, authorName }: Props) {
  return (
    <div
      className={clsx(
        "mt-6 flex flex-col gap-4 border-t border-[#f3f4f6] pt-5 sm:flex-row sm:items-center sm:justify-between"
      )}
    >
      <Link
        href="#"
        className={clsx(
          "flex items-center gap-2 text-[14px] font-bold uppercase",
          "tracking-[0.35px] text-app-accent-blue"
        )}
      >
        ĐỌC BÀI VIẾT
        <svg width="10.5" height="12" viewBox="0 0 10.5 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.2797 6.52969C10.5727 6.23672 10.5727 5.76094 10.2797 5.46797L6.52969 1.71797C6.23672 1.425 5.76094 1.425 5.46797 1.71797C5.175 2.01094 5.175 2.48672 5.46797 2.77969L7.94063 5.25H0.75C0.335156 5.25 0 5.58516 0 6C0 6.41484 0.335156 6.75 0.75 6.75H7.93828L5.47031 9.22031C5.17734 9.51328 5.17734 9.98906 5.47031 10.282C5.76328 10.575 6.23906 10.575 6.53203 10.282L10.282 6.53203L10.2797 6.52969"
            fill="#2973B2"
          />
        </svg>
      </Link>

      <div className={clsx("flex items-center gap-2")}>
        <div className={clsx("size-8 overflow-clip rounded-full border-2 border-app-brand-teal")}>
          <Image
            src={authorAvatar}
            alt={authorName}
            width={32}
            height={32}
            className={clsx("size-full object-cover")}
          />
        </div>
        <div className={clsx("text-[12px] text-[#9ca3af]")}>{authorName}</div>
      </div>
    </div>
  );
}

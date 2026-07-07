import clsx from "clsx";

export default function BannerHeading() {
  return (
    <>
      <h1
        className={clsx(
          "mt-2 text-[44px] tracking-[0.5px] text-white text-shadow-[0_2px_2px_rgba(0,0,0,0.25)] xl:mt-5.25 xl:text-[68px]",
          "font-extrabold leading-13 xl:leading-19.5"
        )}
      >
        Cơ hội đầu tư cổ phiếu F88
      </h1>

      <p
        className={clsx(
          "mt-4 hidden text-body-lg-regular leading-8 tracking-[0.07px] text-white/90 xl:mt-5.25 xl:block"
        )}
      >
        Tham gia đồng hành cùng F88 trong hành trình phát triển
      </p>
    </>
  );
}

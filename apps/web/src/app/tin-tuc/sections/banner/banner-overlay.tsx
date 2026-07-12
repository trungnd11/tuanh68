import clsx from "clsx";

export default function NewsBannerOverlay() {
  return (
    <>
      <div
        className={clsx(
          "absolute inset-0 bg-linear-to-b from-[rgba(41,115,178,0.8)]",
          "via-[rgba(41,115,178,0.6)] to-[rgba(51,51,51,0.8)]"
        )}
      />
      <div className={clsx("absolute inset-0 bg-linear-to-t from-[rgba(15,23,42,0.5)] to-60%", "to-transparent")} />
    </>
  );
}

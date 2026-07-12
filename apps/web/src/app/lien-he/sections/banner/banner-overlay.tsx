import clsx from "clsx";

export default function BannerOverlay() {
  return (
    <>
      <div
        className={clsx("absolute inset-0")}
        style={{
          background:
            "linear-gradient(124deg, rgba(41,115,178,0.88) 0%, rgba(30,41,59,0.82) 60%, rgba(15,23,42,0.75) 100%)",
        }}
      />
      <div className={clsx("absolute inset-0 bg-linear-to-t from-[rgba(15,23,42,0.5)] to-60%", "to-transparent")} />
    </>
  );
}

import clsx from "clsx";

export default function BannerOverlay() {
  return (
    <>
      <div
        className={clsx(
          "absolute inset-0 bg-linear-to-b from-[rgba(41,115,178,0.8)]",
          "via-[rgba(41,115,178,0.6)] to-[rgba(51,51,51,0.8)]"
        )}
      />
      <div
        className={clsx("absolute inset-0 opacity-10")}
        style={{
          backgroundImage:
            "linear-gradient(59deg, rgba(255,255,255,0.05) 0%, transparent 4.5%), linear-gradient(-59deg, rgba(255,255,255,0.05) 0%, transparent 4.5%)",
        }}
      />
    </>
  );
}

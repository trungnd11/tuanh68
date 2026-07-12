import clsx from "clsx";
import FooterBrand from "./footer-brand";
import FooterContact from "./footer-contact";
import FooterLinks from "./footer-links";
import FooterBottom from "./footer-bottom";

export default function AppFooter() {
  return (
    <footer className={clsx("border-t-6 border-app-accent-blue bg-app-dark")}>
      <div
        className={clsx("mx-auto flex max-w-[1280px] flex-col gap-8 px-4 py-10 lg:gap-12 lg:px-8 lg:pt-[70px] lg:pb-8")}
      >
        <div className={clsx("flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-center lg:gap-12")}>
          <FooterBrand />
          <FooterContact />
          <FooterLinks />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
}

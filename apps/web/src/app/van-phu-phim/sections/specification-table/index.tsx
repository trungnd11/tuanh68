import AppButton from "@/shared/ui/app-button";
import AppTable from "@/shared/ui/app-table";
import AppSectionBadge from "@/shared/ui/app-section-badge";
import IconGrid from "@/assets/icons/icon-grid.svg";
import IconDowload from "@/assets/icons/dowload.svg";
import IconInfo from "@/assets/icons/icon-info.svg";
import IconRuler from "@/assets/icons/icon-ruler.svg";
import IconSize from "@/assets/icons/icon-size.svg";
import IconWood from "@/assets/icons/icon-wood.svg";
import IconGlue from "@/assets/icons/icon-glue.svg";
import IconFilm from "@/assets/icons/icon-film.svg";
import IconWeight from "@/assets/icons/icon-weight.svg";
import IconLayers from "@/assets/icons/icon-layers.svg";
import IconDensity from "@/assets/icons/icon-density.svg";
import IconCycle from "@/assets/icons/icon-cycle.svg";
import IconTemperature from "@/assets/icons/icon-temperature.svg";
import IconCertificate from "@/assets/icons/icon-certificate.svg";
import { specTableContent } from "./content";

const iconMap = {
  ruler: <IconRuler className="size-3.5" />,
  size: <IconSize className="size-3.5" />,
  wood: <IconWood className="size-3.5" />,
  glue: <IconGlue className="size-3.5" />,
  film: <IconFilm className="size-3.5" />,
  weight: <IconWeight className="size-3.5" />,
  layers: <IconLayers className="size-3.5" />,
  density: <IconDensity className="size-3.5" />,
  cycle: <IconCycle className="size-3.5" />,
  temperature: <IconTemperature className="size-3.5" />,
  certificate: <IconCertificate className="size-3.5" />,
} as const;

export default function SpecificationTableSection() {
  const rows = specTableContent.rows.map((row) => ({
    ...row,
    icon: iconMap[row.iconKey as keyof typeof iconMap],
  }));

  return (
    <section className="flex flex-col items-start bg-[#f9fafb] py-20 max-md:py-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-14 px-8 max-md:px-4">
        <div className="flex w-full flex-col items-center gap-4">
          <AppSectionBadge centered>{specTableContent.badge}</AppSectionBadge>
          <h2 className="w-full text-center text-4xl font-black uppercase leading-10 text-[#333] max-md:text-[28px] max-md:leading-9">
            {specTableContent.titleParts[0]}
            <span className="text-[#2973b2]">{specTableContent.titleParts[1]}</span>
          </h2>
          <p className="w-full max-w-[576px] text-center text-sm font-normal leading-5 text-gray-500">
            {specTableContent.description[0]}
            <br />
            {specTableContent.description[1]}
          </p>
        </div>

        <div className="flex w-full flex-col items-start overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
          <div className="flex w-full items-center gap-4 bg-[#2973b2] px-8 py-5">
            <IconGrid className="size-5 shrink-0 text-white" />
            <h3 className="text-lg font-bold uppercase leading-7 tracking-[0.45px] text-white">
              {specTableContent.tableHeader.title}
            </h3>
          </div>

          <AppTable columns={specTableContent.columns} rows={rows} />

          <div className="flex w-full items-center justify-between border-t border-gray-200 px-8 py-[19px] max-md:flex-col max-md:gap-3 max-md:px-4">
            <div className="flex items-center gap-2">
              <IconInfo className="size-3 shrink-0" />
              <span className="text-xs font-normal leading-4 text-gray-500">{specTableContent.footer.text}</span>
            </div>
            <AppButton
              href="#"
              className="flex h-auto items-center gap-2 bg-transparent px-0 text-sm font-semibold leading-5 text-[#2973b2]"
            >
              <IconDowload className="size-3.5 shrink-0" />
              <span>{specTableContent.footer.downloadLabel}</span>
            </AppButton>
          </div>
        </div>
      </div>
    </section>
  );
}

import clsx from "clsx";
import Image from "next/image";
import { aboutHeritageContent } from "./content";

function MissionIcon({ type }: { type: string }) {
  switch (type) {
    case "mission":
      return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.25 7C12.25 4.10245 9.89755 1.75 7 1.75C4.10245 1.75 1.75 4.10245 1.75 7C1.75 9.89755 4.10245 12.25 7 12.25C9.89755 12.25 12.25 9.89755 12.25 7V7M0 7C0 3.13659 3.13659 0 7 0C10.8634 0 14 3.13659 14 7C14 10.8634 10.8634 14 7 14C3.13659 14 0 10.8634 0 7V7M7 9.1875C8.20731 9.1875 9.1875 8.20731 9.1875 7C9.1875 5.79269 8.20731 4.8125 7 4.8125C5.79269 4.8125 4.8125 5.79269 4.8125 7C4.8125 8.20731 5.79269 9.1875 7 9.1875V9.1875M7 3.0625C9.17317 3.0625 10.9375 4.82683 10.9375 7C10.9375 9.17317 9.17317 10.9375 7 10.9375C4.82683 10.9375 3.0625 9.17317 3.0625 7C3.0625 4.82683 4.82683 3.0625 7 3.0625V3.0625M6.125 7C6.125 6.51707 6.51707 6.125 7 6.125C7.48293 6.125 7.875 6.51707 7.875 7C7.875 7.48293 7.48293 7.875 7 7.875C6.51707 7.875 6.125 7.48293 6.125 7V7"
            fill="currentColor"
          />
        </svg>
      );
    case "vision":
      return (
        <svg width="15.75" height="14" viewBox="0 0 15.75 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.875 0.875C5.66562 0.875 3.89648 1.88125 2.60859 3.07891C1.32891 4.26562 0.473047 5.6875 0.0683594 6.66367C-0.021875 6.87969 -0.021875 7.12031 0.0683594 7.33633C0.473047 8.3125 1.32891 9.73438 2.60859 10.9211C3.89648 12.1188 5.66562 13.125 7.875 13.125C10.0844 13.125 11.8535 12.1188 13.1414 10.9211C14.4211 9.73164 15.277 8.3125 15.6844 7.33633C15.7746 7.12031 15.7746 6.87969 15.6844 6.66367C15.277 5.6875 14.4211 4.26562 13.1414 3.07891C11.8535 1.88125 10.0844 0.875 7.875 0.875V0.875M3.9375 7C3.9375 5.59327 4.68798 4.29339 5.90625 3.59002C7.12452 2.88666 8.62548 2.88666 9.84375 3.59002C11.062 4.29339 11.8125 5.59327 11.8125 7C11.8125 9.17317 10.0482 10.9375 7.875 10.9375C5.70183 10.9375 3.9375 9.17317 3.9375 7V7M7.875 5.25C7.875 6.21523 7.09023 7 6.125 7C5.93086 7 5.74492 6.96719 5.56992 6.90977C5.41953 6.86055 5.24453 6.95352 5.25 7.11211C5.2582 7.30078 5.28555 7.48945 5.3375 7.67812C5.71211 9.07812 7.15313 9.90937 8.55313 9.53477C9.95313 9.16016 10.7844 7.71914 10.4098 6.31914C10.1063 5.18437 9.10273 4.42148 7.98711 4.375C7.82852 4.36953 7.73555 4.5418 7.78477 4.69492C7.84219 4.86992 7.875 5.05586 7.875 5.25V5.25"
            fill="currentColor"
          />
        </svg>
      );
    case "commitment":
      return (
        <svg width="17.5" height="14" viewBox="0 0 17.5 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.84297 2.32969L6.19609 4.47344C5.75586 4.82891 5.67109 5.46875 6.00469 5.92539C6.35742 6.41211 7.04375 6.50781 7.5168 6.13867L10.232 4.02773C10.4234 3.88008 10.6969 3.91289 10.8473 4.1043C10.9977 4.2957 10.9621 4.56914 10.7707 4.71953L10.1992 5.1625L14 8.6625V3.5H13.9809L13.8742 3.43164L11.8891 2.16016C11.4707 1.89219 10.9813 1.75 10.4836 1.75C9.8875 1.75 9.30781 1.95508 8.84297 2.32969V2.32969M9.46641 5.73125L8.05273 6.83047C7.19141 7.50312 5.9418 7.32812 5.29648 6.44219C4.68945 5.6082 4.84258 4.44336 5.64375 3.79531L7.91875 1.95508C7.60156 1.82109 7.25977 1.75273 6.9125 1.75273C6.39844 1.75 5.89805 1.90312 5.46875 2.1875L3.5 3.5V9.625H4.27109L6.77031 11.9055C7.30625 12.3949 8.13477 12.3566 8.62422 11.8207C8.77461 11.6539 8.87578 11.4598 8.92773 11.2574L9.39258 11.684C9.92578 12.1734 10.757 12.1379 11.2465 11.6047C11.3695 11.4707 11.4598 11.3148 11.5172 11.1535C12.0477 11.509 12.7695 11.4352 13.2152 10.9484C13.7047 10.4152 13.6691 9.58398 13.1359 9.09453L9.46641 5.73125V5.73125M0.4375 3.5C0.196875 3.5 0 3.69688 0 3.9375V9.625C0 10.109 0.391016 10.5 0.875 10.5H1.75C2.23398 10.5 2.625 10.109 2.625 9.625V3.5H0.4375V3.5M1.3125 8.75C1.55396 8.75 1.75 8.94604 1.75 9.1875C1.75 9.42896 1.55396 9.625 1.3125 9.625C1.07104 9.625 0.875 9.42896 0.875 9.1875C0.875 8.94604 1.07104 8.75 1.3125 8.75V8.75M14.875 3.5V9.625C14.875 10.109 15.266 10.5 15.75 10.5H16.625C17.109 10.5 17.5 10.109 17.5 9.625V3.9375C17.5 3.69688 17.3031 3.5 17.0625 3.5H14.875V3.5M15.75 9.1875C15.75 8.94604 15.946 8.75 16.1875 8.75C16.429 8.75 16.625 8.94604 16.625 9.1875C16.625 9.42896 16.429 9.625 16.1875 9.625C15.946 9.625 15.75 9.42896 15.75 9.1875V9.1875"
            fill="currentColor"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function AboutHeritageSection() {
  return (
    <section className={clsx("bg-white")}>
      <div className={clsx("flex min-h-150 flex-col", "lg:flex-row")}>
        <div className={clsx("relative flex-1 overflow-clip")}>
          <div className={clsx("h-125 w-full", "lg:h-full lg:min-h-198")}>
            <Image
              src="/assets/about/timber-logs.jpg"
              alt="Nguyên liệu gỗ tại nhà máy Tu Anh 68"
              fill
              className={clsx("object-cover")}
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div
            className={clsx("absolute inset-0")}
            style={{
              background: "linear-gradient(to right, rgba(41,115,178,0) 0%, rgba(41,115,178,0.2) 100%)",
            }}
          />
          <div
            className={clsx(
              "absolute bottom-8 left-8",
              "rounded-lg bg-app-accent-blue px-6 py-4",
              "shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]"
            )}
          >
            <span className={clsx("block text-3xl font-black leading-9 text-white")}>1994</span>
            <span className={clsx("block text-sm font-medium leading-5 text-blue-200")}>Năm thành lập</span>
          </div>
        </div>

        <div className={clsx("flex flex-1 flex-col justify-center bg-white", "px-4 py-12 lg:px-16 lg:py-16")}>
          <div className={clsx("mb-6 flex items-center gap-3")}>
            <div className={clsx("h-0.5 w-10 bg-app-brand-teal")} />
            <span className={clsx("text-sm font-semibold uppercase tracking-[1.4px] text-app-brand-teal")}>
              {aboutHeritageContent.badge}
            </span>
          </div>

          <h2 className={clsx("mb-6 text-2xl lg:text-4xl font-black leading-8 lg:leading-10 uppercase", "text-[#333]")}>
            {aboutHeritageContent.title[0]}
            <br />
            <span className={clsx("text-app-accent-blue")}>{aboutHeritageContent.title[1]}</span>
          </h2>

          {aboutHeritageContent.paragraphs.map((para, i) => (
            <p key={i} className={clsx("mb-6 text-sm lg:text-base leading-6.5 text-gray-600", "last:mb-8")}>
              {para.boldParts.map((part, j) =>
                part.bold ? (
                  <strong key={j} className={clsx("font-bold text-[#333]")}>
                    {part.text}
                  </strong>
                ) : (
                  <span key={j}>{part.text}</span>
                )
              )}
            </p>
          ))}

          <div className={clsx("flex flex-col gap-4")}>
            {aboutHeritageContent.missionValues.map((item) => (
              <div key={item.title} className={clsx("flex gap-4")}>
                <div
                  className={clsx("mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full")}
                  style={{ backgroundColor: item.iconBg, color: item.iconColor }}
                >
                  <MissionIcon type={item.icon} />
                </div>
                <div className={clsx("flex flex-col gap-[2.875px]")}>
                  <h3 className={clsx("text-sm lg:text-base font-bold leading-6 text-[#333]")}>{item.title}</h3>
                  <p className={clsx("text-sm leading-[22.75px] text-gray-600")}>
                    {item.description[0]}
                    <br />
                    {item.description[1]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

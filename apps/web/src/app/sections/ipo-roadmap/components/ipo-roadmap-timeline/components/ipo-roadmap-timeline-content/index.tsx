import clsx from "clsx";

const CONTENT_DATA: Record<string, { title: string; date: string; items: string[] }> = {
  introduceStock: {
    title: "Giới thiệu cổ phiếu",
    date: "02/07 - 05/07",
    items: ["Công bố thông tin chào bán cổ phiếu ra công chúng", "Công bố Bản cáo bạch và các tài liệu liên quan"],
  },
  subscription: {
    title: "Đăng ký mua cổ phiếu",
    date: "06/07 - 27/07",
    items: ["Nhà đầu tư đăng ký mua cổ phiếu qua các kênh được chỉ định", "Thời gian đăng ký từ 06/07 đến 27/07"],
  },
  allocation: {
    title: "Phân bổ cổ phiếu",
    date: "27/07 - 28/07",
    items: ["Phân bổ cổ phiếu cho các nhà đầu tư đã đăng ký thành công", "Xác nhận kết quả phân bổ"],
  },
  payment: {
    title: "Thanh toán",
    date: "30/07 - 04/08",
    items: ["Nhà đầu tư thực hiện thanh toán tiền mua cổ phiếu"],
  },
  ipoResult: {
    title: "Kết quả IPO",
    date: "06/08/2026",
    items: ["Công bố kết quả đợt chào bán cổ phiếu"],
  },
  hoseListingRegistration: {
    title: "Đăng ký niêm yết HOSE",
    date: "Dự kiến T8/2026",
    items: ["Nộp hồ sơ đăng ký niêm yết lên Sở Giao dịch Chứng khoán TP.HCM"],
  },
  hoseListing: {
    title: "Niêm yết HOSE",
    date: "Dự kiến Q4 2026",
    items: ["Cổ phiếu F88 chính thức giao dịch trên Sở Giao dịch Chứng khoán TP.HCM"],
  },
};

type IpoRoadmapTimelineContentProps = {
  stepKey: string;
};

export default function IpoRoadmapTimelineContent({ stepKey }: IpoRoadmapTimelineContentProps) {
  const data = CONTENT_DATA[stepKey];

  if (!data) {
    return null;
  }

  return (
    <div
      className={clsx(
        "bg-[#edfaf7]",
        "border border-solid border-[rgba(0,132,74,0.5)]",
        "flex flex-col gap-5 items-start px-8 py-9 rounded-2xl w-full"
      )}
    >
      <div className={clsx("flex flex-col gap-2 items-start")}>
        <p className={clsx("text-[20px] font-bold leading-7 text-[#030712]")}>{data.title}</p>
        <p className={clsx("text-[18px] font-semibold leading-normal text-[#00844a]")}>{data.date}</p>
      </div>

      <div className={clsx("flex flex-col gap-2 items-start w-full")}>
        {data.items.map((item, index) => (
          <div key={index} className={clsx("flex gap-2.5 items-start w-full")}>
            <span className={clsx("shrink-0 mt-1.5 size-[6px] rounded-full bg-[#00844a]")} />
            <p className={clsx("flex-1 text-[14px] font-medium leading-5 text-[#030712]")}>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

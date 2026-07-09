import LogoImg from "@/assets/footer/logo.png";
import LocationIcon from "@/assets/footer/location.svg";
import PhoneIcon from "@/assets/footer/phone.svg";
import EmailIcon from "@/assets/footer/email.svg";
import WebsiteIcon from "@/assets/footer/website.svg";
import ChevronIcon from "@/assets/footer/chevron.svg";
import Social1 from "@/assets/footer/social-1.svg";
import Social2 from "@/assets/footer/social-2.svg";
import Social3 from "@/assets/footer/social-3.svg";
import BctLogoImg from "@/assets/footer/bct-logo.jpg";

export const companyInfo = {
  logo: LogoImg,
  name: "Tu Anh 68",
  description:
    "Công ty TNHH Sản Xuất Tu Anh 68 là đơn vị chuyên sản xuất và phân phối các loại ván ép phủ phim, ván ép nội thất chất lượng cao hàng đầu tại Việt Nam.",
  socials: [
    { label: "Facebook", icon: Social1, href: "#" },
    { label: "YouTube", icon: Social2, href: "#" },
    { label: "Zalo", icon: Social3, href: "#" },
  ],
};

export const contactInfo = {
  heading: "THÔNG TIN LIÊN HỆ",
  items: [
    {
      icon: LocationIcon,
      text: ["Khu công nghiệp Hồ Điền, Liên Trung, Đan Phượng,", "Hà Nội"],
    },
    {
      icon: PhoneIcon,
      text: "096 646 7895 / 0983 570 760",
    },
    {
      icon: EmailIcon,
      text: "admin@vanphuphim.vn.com",
    },
    {
      icon: WebsiteIcon,
      text: "vanphuphim.vn.com",
    },
  ],
};

export const quickLinks = {
  heading: "LIÊN KẾT NHANH",
  items: [
    { label: "Về chúng tôi", href: "#" },
    { label: "Sản phẩm Ván Ép", href: "#" },
    { label: "Chính sách đại lý", href: "#" },
    { label: "Tin tức & Sự kiện", href: "#" },
  ],
  bctLogo: BctLogoImg,
};

export const bottomBar = {
  copyright: "© 2025 Tu Anh 68 Manufacturing CO.,LTD. All rights reserved.",
  links: [
    { label: "Điều khoản sử dụng", href: "#" },
    { label: "Chính sách bảo mật", href: "#" },
  ],
};

export { ChevronIcon };

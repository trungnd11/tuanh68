export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  specs: string[];
  image: string;
  category: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Statistic {
  id: string;
  value: string;
  label: string;
  suffix?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface ManufacturingStep {
  id: string;
  title: string;
  description: string;
}

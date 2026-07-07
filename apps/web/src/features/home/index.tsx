'use client';

import { HeroSection } from './components/Hero';
import { StatisticsSection } from './components/Statistics';
import { AboutFactorySection } from './components/AboutFactory';
import { FeaturedProductsSection } from './components/FeaturedProducts';
import { ManufacturingSection } from './components/Manufacturing';
import { ProjectsSection } from './components/Projects';
import { PartnersSection } from './components/Partners';
import { TestimonialsSection } from './components/Testimonials';
import { FaqSection } from './components/Faq';
import { CallToActionSection } from './components/CallToAction';

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatisticsSection />
      <AboutFactorySection />
      <FeaturedProductsSection />
      <ManufacturingSection />
      <ProjectsSection />
      <PartnersSection />
      <TestimonialsSection />
      <FaqSection />
      <CallToActionSection />
    </main>
  );
}

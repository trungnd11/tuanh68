'use client';

import {
  AppContainer,
  AppSection,
  AppHeading,
  AppText,
} from '@tuanh68/ui';
import { useInView } from '../../hooks';
import { projects } from '../../mock/projects';

export function ProjectsSection() {
  const { ref, inView } = useInView();
  const featuredProject = projects[0];

  return (
    <AppSection ref={ref} background="default" spacing="lg">
      <AppContainer size="2xl">
        {/* Header */}
        <div className="flex flex-col tablet:flex-row items-start tablet:items-end justify-between mb-12">
          <div>
            <AppText variant="overline" color="accent" as="div" className="mb-4">
              Dự án
            </AppText>
            <AppHeading level="headline" headline="xl" as="h2">
              Công Trình Tiêu Biểu
            </AppHeading>
          </div>
          <AppText
            variant="body"
            size="md"
            color="accent"
            as="span"
            className="inline-flex items-center gap-1 cursor-pointer hover:gap-2 transition-all duration-fast mt-4 tablet:mt-0"
          >
            Xem tất cả
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </AppText>
        </div>

        {/* Featured project — full width */}
        {featuredProject && (
          <div
            className={`mb-6 transition-all duration-700 ease-standard ${
              inView ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'
            }`}
          >
            <div className="relative aspect-[16/9] laptop:aspect-[21/9] rounded-2xl overflow-hidden bg-surface-tertiary group cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center">
                <AppText variant="body" size="md" color="muted">
                  TODO: {featuredProject.image}
                </AppText>
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background-primary/90 via-background-primary/20 to-transparent" />
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 laptop:p-10">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-label bg-surface-glass backdrop-blur-glass border border-border-glass text-primary-300 mb-3">
                  {featuredProject.category}
                </span>
                <AppHeading level="headline" headline="lg" as="h3" className="text-text-primary">
                  {featuredProject.title}
                </AppHeading>
                <AppText variant="body" size="md" color="secondary" className="mt-1 max-w-[50ch]">
                  {featuredProject.description}
                </AppText>
              </div>
            </div>
          </div>
        )}

        {/* Remaining projects — grid */}
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6">
          {projects.slice(1).map((project, index) => (
            <div
              key={project.id}
              className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface-tertiary group cursor-pointer transition-all duration-700 ease-standard ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <AppText variant="body" size="sm" color="muted">
                  TODO: {project.image}
                </AppText>
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background-primary/90 via-background-primary/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-normal" />
              {/* Glass overlay on hover */}
              <div className="absolute inset-0 bg-surface-glass opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity duration-normal" />
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-caption bg-surface-glass backdrop-blur-glass border border-border-glass text-primary-300 mb-2">
                  {project.category}
                </span>
                <AppHeading level="title" title="md" as="h3" className="text-text-primary">
                  {project.title}
                </AppHeading>
                <AppText variant="body" size="sm" color="secondary" className="mt-1 line-clamp-2">
                  {project.description}
                </AppText>
              </div>
            </div>
          ))}
        </div>
      </AppContainer>
    </AppSection>
  );
}

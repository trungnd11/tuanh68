'use client';

import {
  AppContainer,
  AppSection,
  AppGrid,
  AppCard,
  AppHeading,
  AppText,
  AppBadge,
} from '@tuanh68/ui';
import { useInView } from '../../hooks';
import { products } from '../../mock/products';

export function FeaturedProductsSection() {
  const { ref, inView } = useInView();

  return (
    <AppSection ref={ref} background="default" spacing="lg">
      <AppContainer size="2xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <AppText variant="overline" color="accent" as="div" className="mb-4">
            Sản phẩm
          </AppText>
          <AppHeading level="headline" headline="xl" as="h2" align="center">
            Ván Ép Phủ Phim Cao Cấp
          </AppHeading>
          <AppText variant="body" size="lg" color="secondary" className="mt-3 max-w-[60ch] mx-auto" as="div">
            Sản phẩm chủ lực được sản xuất trên dây chuyền hiện đại, đáp ứng mọi tiêu chuẩn kỹ thuật khắt khe nhất
          </AppText>
        </div>

        {/* Product grid */}
        <AppGrid columns={2} gap="lg">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`transition-all duration-700 ease-standard ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <AppCard variant="elevated" padding="lg" radius="2xl" interactive className="group">
                {/* Image */}
                <div className="aspect-[16/9] rounded-xl overflow-hidden mb-5 bg-surface-tertiary relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-primary via-transparent to-transparent z-10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AppText variant="body" size="sm" color="muted">
                      TODO: {product.name}
                    </AppText>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <AppBadge variant="primary">
                    {product.category}
                  </AppBadge>
                  <AppHeading level="title" title="lg" as="h3">
                    {product.name}
                  </AppHeading>
                  <AppText variant="body" size="sm" color="muted" className="line-clamp-2">
                    {product.description}
                  </AppText>

                  {/* Specs pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {product.specs.map((spec) => (
                      <span
                        key={spec}
                        className="inline-flex items-center px-2.5 py-1 rounded-md text-body-sm bg-surface-elevated text-text-muted"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="pt-2">
                    <AppText
                      variant="body"
                      size="sm"
                      color="accent"
                      as="span"
                      className="inline-flex items-center gap-1 cursor-pointer hover:gap-2 transition-all duration-fast"
                    >
                      Xem chi tiết
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </AppText>
                  </div>
                </div>
              </AppCard>
            </div>
          ))}
        </AppGrid>
      </AppContainer>
    </AppSection>
  );
}

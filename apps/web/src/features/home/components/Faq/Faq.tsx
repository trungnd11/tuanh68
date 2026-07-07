'use client';

import {
  AppContainer,
  AppSection,
  AppHeading,
  AppText,
  Accordion,
} from '@tuanh68/ui';
import { faqItems } from '../../mock/faq';

export function FaqSection() {
  return (
    <AppSection background="default" spacing="lg">
      <AppContainer size="lg">
        <div className="text-center mb-12">
          <AppText variant="overline" color="accent" as="div" className="mb-4">
            Hỏi đáp
          </AppText>
          <AppHeading level="headline" headline="lg" as="h2" align="center">
            Câu Hỏi Thường Gặp
          </AppHeading>
        </div>

        <div className="bg-surface-glass backdrop-blur-glass border border-border-glass rounded-2xl p-card-md laptop:p-card-lg shadow-glass">
          <Accordion
            items={faqItems.map((item) => ({
              id: item.id,
              title: item.question,
              content: item.answer,
            }))}
            type="single"
          />
        </div>
      </AppContainer>
    </AppSection>
  );
}

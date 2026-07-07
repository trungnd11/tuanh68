export type InvestorFaqItem = {
  question: string;
  answer: string;
};

type InvestorFaqTranslations = {
  (key: "heading.subTitle"): string;
  (key: "heading.title"): string;
  (key: "items.0.question"): string;
  (key: "items.0.answer"): string;
  (key: "items.1.question"): string;
  (key: "items.1.answer"): string;
  (key: "items.2.question"): string;
  (key: "items.2.answer"): string;
  (key: "items.3.question"): string;
  (key: "items.3.answer"): string;
  (key: "items.4.question"): string;
  (key: "items.4.answer"): string;
  (key: "items.5.question"): string;
  (key: "items.5.answer"): string;
  (key: "items.6.question"): string;
  (key: "items.6.answer"): string;
};

export function getInvestorFaqHeading(t: InvestorFaqTranslations) {
  return {
    subTitle: t("heading.subTitle"),
    title: t("heading.title"),
  };
}

export function getInvestorFaqItems(t: InvestorFaqTranslations): InvestorFaqItem[] {
  return [
    {
      question: t("items.0.question"),
      answer: t("items.0.answer"),
    },
    {
      question: t("items.1.question"),
      answer: t("items.1.answer"),
    },
    {
      question: t("items.2.question"),
      answer: t("items.2.answer"),
    },
    {
      question: t("items.3.question"),
      answer: t("items.3.answer"),
    },
    {
      question: t("items.4.question"),
      answer: t("items.4.answer"),
    },
    {
      question: t("items.5.question"),
      answer: t("items.5.answer"),
    },
    {
      question: t("items.6.question"),
      answer: t("items.6.answer"),
    },
  ];
}

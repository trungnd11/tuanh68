export const TextUtil = {
  wrapAfter(text: string, keywords: string[]): string {
    for (const keyword of keywords) {
      const index = text.indexOf(keyword);

      if (index >= 0) {
        return text.slice(0, index + keyword.length) + "\n" + text.slice(index + keyword.length);
      }
    }

    return text;
  },
};

export function toggleAccordionIndex(openIndexes: number[], index: number) {
  return openIndexes.includes(index) ? openIndexes.filter((openIndex) => openIndex !== index) : [...openIndexes, index];
}

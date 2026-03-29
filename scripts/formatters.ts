const PRICE_LEVEL_LABELS: Record<string, string> = {
  INEXPENSIVE: "$",
  MODERATE: "$$",
  EXPENSIVE: "$$$",
};

export function formatPriceLevel(priceLevel?: string) {
  if (!priceLevel) {
    return "";
  }

  return PRICE_LEVEL_LABELS[priceLevel] ?? "";
}

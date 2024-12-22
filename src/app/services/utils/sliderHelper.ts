export const getClassName = (
  index: number,
  activeIndex: number,
  totalItems: number
): string => {
  const adjustedActiveIndex =
    ((activeIndex % totalItems) + totalItems) % totalItems;
  if (index === adjustedActiveIndex) return "active";
  if (index === (adjustedActiveIndex + 1) % totalItems) return "next";
  if (index === (adjustedActiveIndex - 1 + totalItems) % totalItems)
    return "prev";
  return "";
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value) => {
  return new Intl.NumberFormat("en-US").format(value);
};

export const formatPercentage = (value) => {
  return `${value}%`;
};

export const getGrowthColor = (value) => {
  if (value > 0) return "success";
  if (value < 0) return "danger";
  return "neutral";
};

export const getGrowthIcon = (value) => {
  if (value > 0) return "up";
  if (value < 0) return "down";
  return "equal";
};

export const sortDescending = (data, key) => {
  return [...data].sort((a, b) => b[key] - a[key]);
};

export const sortAscending = (data, key) => {
  return [...data].sort((a, b) => a[key] - b[key]);
};
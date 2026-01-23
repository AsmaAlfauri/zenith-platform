export const formatNumber = (num) => (num != null ? num.toLocaleString() : "-");
export const formatPercent = (num) => (num != null ? num.toFixed(2) + "%" : "-");

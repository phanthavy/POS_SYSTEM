export const formatLAK = (amount: number) =>
  amount.toLocaleString("en-US") + " ₭";

export const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

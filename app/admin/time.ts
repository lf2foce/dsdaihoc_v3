/** "3 giờ trước", with the exact stamp kept alongside for the tooltip. */
export function timeAgo(value: string | Date) {
  const then = value instanceof Date ? value : new Date(value);
  const seconds = Math.round((Date.now() - then.getTime()) / 1000);

  const steps: [number, string][] = [
    [60, "giây"],
    [60, "phút"],
    [24, "giờ"],
    [7, "ngày"],
    [4.35, "tuần"],
    [12, "tháng"],
  ];

  let amount = Math.max(seconds, 0);
  let unit = "giây";
  for (const [size, nextUnit] of steps) {
    if (amount < size) break;
    amount = Math.floor(amount / size);
    unit = nextUnit;
  }

  return amount < 1 && unit === "giây" ? "vừa xong" : `${amount} ${unit} trước`;
}

export function exactTime(value: string | Date) {
  const then = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(then);
}

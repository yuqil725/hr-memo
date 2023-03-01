export const TsToStr = (Ts: number) => {
  const todate = new Date(Ts).getDate();
  const todateStr = todate < 10 ? "0" + todate : todate;
  const tomonth = new Date(Ts).getMonth() + 1;
  const tomonthStr = tomonth < 10 ? "0" + tomonth : tomonth;
  const toyear = new Date(Ts).getFullYear();
  return "[" + toyear + "/" + tomonthStr + "/" + todateStr + "]";
};

export const StrToTs = (s: string) => {
  return Date.parse(s.slice(1, -2));
};

export const TsToStr = (Ts: number) => {
  const todate = new Date(Ts).getDate();
  const tomonth = new Date(Ts).getMonth() + 1;
  const toyear = new Date(Ts).getFullYear();
  return "[" + toyear + "/" + tomonth + "/" + todate + "] ";
};

export const StrToTs = (s: string) => {
  return Date.parse(s.slice(1, -2));
};

/** Display-layer formatting only — all rounding happens here, never in formulas. */

const currency0 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const currency2 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const number0 = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export const fmtMoney = (v: number | null): string => (v === null ? "—" : currency2.format(v));

export const fmtMoneyHeadline = (v: number | null): string =>
  v === null ? "—" : currency0.format(v);

export const fmtHours = (v: number | null): string =>
  v === null ? "—" : `${number0.format(Math.round(v))} h`;

export const fmtNumber = (v: number | null): string => (v === null ? "—" : number0.format(v));

export const fmtPercent = (v: number | null): string =>
  v === null ? "—" : `${Math.round(v * 1000) / 10}%`;

export const fmtMonths = (v: number | null): string =>
  v === null ? "Not achieved" : `${Math.round(v * 10) / 10} months`;

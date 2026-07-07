export type CountdownItem = {
  label: string;
  value: string;
  isActive?: boolean;
};

export type BannerCountdownProps = {
  dateRangePrefix: string;
  dateRangeLabel: string;
  countdownLabels: [string, string, string, string];
  targetDate: string;
  initialRemainingSeconds: number;
};

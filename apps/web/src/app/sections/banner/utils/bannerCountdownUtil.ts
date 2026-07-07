import type { CountdownItem } from "@/app/sections/banner/components/banner-countdown/types";

export const BannerCountdownUtil = {
  padCountdownValue(value: number) {
    return String(value).padStart(2, "0");
  },
  getRemainingSeconds(targetDate: string) {
    const targetTimestamp = new Date(targetDate).getTime();

    if (Number.isNaN(targetTimestamp)) {
      return 0;
    }

    const diffInMs = targetTimestamp - Date.now();

    return Math.max(0, Math.floor(diffInMs / 1000));
  },
  createCountdownItems(remainingSeconds: number, countdownLabels: [string, string, string, string]): CountdownItem[] {
    const days = Math.floor(remainingSeconds / (24 * 60 * 60));
    const hours = Math.floor((remainingSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
    const seconds = remainingSeconds % 60;

    return [
      { label: countdownLabels[0], value: this.padCountdownValue(days) },
      { label: countdownLabels[1], value: this.padCountdownValue(hours) },
      {
        label: countdownLabels[2],
        value: this.padCountdownValue(minutes),
      },
      {
        label: countdownLabels[3],
        value: this.padCountdownValue(seconds),
        isActive: true,
      },
    ];
  },
};

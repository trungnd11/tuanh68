import { useEffect, useState } from "react";
import { BannerCountdownUtil } from "../../utils/bannerCountdownUtil";
import type { UseBannerCountdownParams } from "./types";

export function useBannerCountdown({ targetDate, initialRemainingSeconds }: UseBannerCountdownParams) {
  const [remainingSeconds, setRemainingSeconds] = useState(initialRemainingSeconds);

  useEffect(() => {
    setRemainingSeconds(BannerCountdownUtil.getRemainingSeconds(targetDate));

    const intervalId = window.setInterval(() => {
      setRemainingSeconds(BannerCountdownUtil.getRemainingSeconds(targetDate));
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [targetDate]);

  return { remainingSeconds };
}

"use client";

import { useCallback, useState } from "react";

export function useSuccessCountdownModal() {
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const closeSuccessModal = useCallback(() => {
    setSuccessModalOpen(false);
  }, []);

  const openSuccessModal = useCallback(() => {
    setSuccessModalOpen(true);
  }, []);

  return {
    successModalOpen,
    successSecondsRemaining: 0,
    openSuccessModal,
    closeSuccessModal,
  };
}

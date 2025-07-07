import { useState, useCallback } from 'react';

export const useTransitionState = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingHealthAnimation, setPendingHealthAnimation] = useState(false);

  const startTransition = useCallback(() => {
    setIsTransitioning(true);
  }, []);

  const completeTransition = useCallback(() => {
    setIsTransitioning(false);
    // Small delay to allow health animations to start after transition
    setTimeout(() => {
      setPendingHealthAnimation(true);
      // Reset the pending animation flag after animations complete
      setTimeout(() => {
        setPendingHealthAnimation(false);
      }, 1500); // Health animations duration + buffer
    }, 200); // Buffer after transition completes
  }, []);

  return {
    isTransitioning,
    pendingHealthAnimation,
    startTransition,
    completeTransition
  };
};
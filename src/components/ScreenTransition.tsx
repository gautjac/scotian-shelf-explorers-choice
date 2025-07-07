import { ReactNode, useEffect, useState } from 'react';

interface ScreenTransitionProps {
  children: ReactNode;
  isVisible: boolean;
  direction?: 'forward' | 'backward' | 'fade';
  onTransitionComplete?: () => void;
  onTransitionStart?: () => void;
}

export const ScreenTransition = ({ 
  children, 
  isVisible, 
  direction = 'forward',
  onTransitionComplete,
  onTransitionStart 
}: ScreenTransitionProps) => {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      onTransitionStart?.();
      // Slight delay to ensure element is rendered before animation
      setTimeout(() => {
        if (direction === 'forward') {
          setAnimationClass('animate-slide-in-right');
        } else if (direction === 'backward') {
          setAnimationClass('animate-slide-in-left');
        } else if (direction === 'fade') {
          setAnimationClass('animate-fade-cross-in');
        }
      }, 10);
    } else {
      onTransitionStart?.();
      // Start exit animation
      if (direction === 'forward') {
        setAnimationClass('animate-slide-out-right');
      } else if (direction === 'backward') {
        setAnimationClass('animate-slide-out-left');
      } else if (direction === 'fade') {
        setAnimationClass('animate-fade-cross-out');
      }
      
      // Remove from DOM after animation completes
      setTimeout(() => {
        setShouldRender(false);
        onTransitionComplete?.();
      }, 500);
    }
  }, [isVisible, direction, onTransitionComplete, onTransitionStart]);

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 z-10 ${animationClass}`}>
      {children}
    </div>
  );
};
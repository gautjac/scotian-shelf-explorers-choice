import React, { useMemo, useState } from 'react';
import fallbackImage from '@/assets/fishing-boat-overlay.jpg';

export type ImageWithFallbackProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string | null | undefined;
};

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt = '', loading, ...rest }) => {
  const [errored, setErrored] = useState(false);

  const resolvedSrc = useMemo(() => {
    if (!src) return fallbackImage;
    if (typeof src === 'string' && src.startsWith('asset:')) {
      const file = src.slice('asset:'.length).replace(/^\/+/, '');
      // Map to public folder for offline-friendly static paths
      return `/images/scenarios/${file}`;
    }
    return src as string;
  }, [src]);

  return (
    <img
      {...rest}
      src={errored ? (fallbackImage as string) : resolvedSrc}
      alt={alt}
      loading={loading ?? 'lazy'}
      onError={() => setErrored(true)}
    />
  );
};

export default ImageWithFallback;

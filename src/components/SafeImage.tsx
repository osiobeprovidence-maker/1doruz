import { useState, useRef, useEffect, type SyntheticEvent } from 'react';

interface SafeImageProps {
  src?: string;
  alt?: string;
  className?: string;
  fallbackSrc?: string;
  showPlaceholder?: boolean;
  loading?: string;
  decoding?: string;
  onLoad?: (e: any) => void;
  onError?: (e: any) => void;
  [key: string]: any;
}

export default function SafeImage({
  src,
  alt,
  fallbackSrc,
  showPlaceholder = false,
  className,
  onLoad,
  onError,
  ...rest
}: SafeImageProps) {
  const [status, setStatus] = useState<'idle' | 'loaded' | 'error'>('idle');
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setStatus('idle');
  }, [src]);

  const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
    setStatus('error');
    if (fallbackSrc && e.currentTarget.src !== fallbackSrc) {
      e.currentTarget.src = fallbackSrc;
    }
    onError?.(e);
  };

  const handleLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    setStatus('loaded');
    onLoad?.(e);
  };

  if (status === 'error' && !fallbackSrc && showPlaceholder) {
    return (
      <div
        className={`flex items-center justify-center bg-[var(--card)] text-[var(--muted)] ${className || ''}`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt || ''}
      className={className}
      onLoad={handleLoad}
      onError={handleError}
      loading="lazy"
      decoding="async"
      {...rest}
    />
  );
}

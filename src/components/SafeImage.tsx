import { useState, useEffect, useCallback, useMemo, type SyntheticEvent } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

interface SafeImageProps {
  src?: string | null;
  storageId?: string | null;
  alt?: string;
  className?: string;
  fallbackSrc?: string;
  showPlaceholder?: boolean;
  onLoad?: (e: any) => void;
  onError?: (e: any) => void;
  [key: string]: any;
}

function extractStorageId(url: string | null | undefined): string | null {
  if (!url) return null;
  const match = url.match(/\/api\/storage\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

export default function SafeImage({
  src,
  storageId: storageIdProp,
  alt,
  fallbackSrc,
  showPlaceholder = false,
  className,
  onLoad,
  onError,
  ...rest
}: SafeImageProps) {
  const resolvedId = useMemo(
    () => storageIdProp || extractStorageId(src),
    [storageIdProp, src]
  );

  const signedUrl = useQuery(
    api.uploads.getUrl,
    resolvedId ? { storageId: resolvedId } : 'skip'
  );

  const effectiveSrc = resolvedId && signedUrl ? signedUrl : src || '';

  const [status, setStatus] = useState<'idle' | 'loaded' | 'error'>('idle');
  const [displaySrc, setDisplaySrc] = useState(effectiveSrc);

  useEffect(() => {
    setStatus('idle');
    setDisplaySrc(effectiveSrc);
  }, [effectiveSrc]);

  const handleError = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
    setStatus('error');
    if (fallbackSrc && displaySrc !== fallbackSrc) {
      setDisplaySrc(fallbackSrc);
      e.currentTarget.src = fallbackSrc;
    }
    onError?.(e);
  }, [fallbackSrc, displaySrc, onError]);

  const handleLoad = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
    setStatus('loaded');
    onLoad?.(e);
  }, [onLoad]);

  if (status === 'error' && !fallbackSrc && showPlaceholder) {
    return (
      <div
        className={`flex items-center justify-center bg-[var(--card)] text-[var(--muted)] ${className || ''}`}
        {...rest as any}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
    );
  }

  if (status === 'error' && !fallbackSrc) {
    return null;
  }

  if (!displaySrc) {
    if (showPlaceholder) {
      return (
        <div
          className={`flex items-center justify-center bg-[var(--card)] text-[var(--muted)] ${className || ''}`}
          {...rest as any}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
      );
    }
    return null;
  }

  return (
    <img
      src={displaySrc}
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

export function createPreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}

export function revokePreviewUrl(url: string) {
  if (url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
}

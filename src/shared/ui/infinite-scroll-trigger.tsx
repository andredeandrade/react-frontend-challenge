import { useEffect, useRef } from 'react';

type InfiniteScrollTriggerProps = {
  enabled: boolean;
  loading: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
  className?: string;
};

export function InfiniteScrollTrigger({
  enabled,
  loading,
  onLoadMore,
  rootMargin = '240px 0px',
  className,
}: InfiniteScrollTriggerProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading) {
          onLoadMore();
        }
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [enabled, loading, onLoadMore, rootMargin]);

  return <div ref={ref} className={className} />;
}

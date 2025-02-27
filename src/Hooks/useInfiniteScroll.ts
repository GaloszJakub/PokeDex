import { useEffect } from "react";

export const useInfiniteScroll = (
    containerRef: React.RefObject<HTMLElement | null>,
    isLoading: boolean,
    hasMore: boolean,
    loadMore: () => void
) => {
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            // Oblicz pozycję scrolla z 200px marginesem
            const scrollPosition = container.scrollTop + container.clientHeight;
            const scrollThreshold = container.scrollHeight - 200;

            if (scrollPosition >= scrollThreshold && !isLoading && hasMore) {
                loadMore();
            }
            if (container.scrollHeight < 330 && !isLoading && hasMore) {
                loadMore();
            }
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, [isLoading, hasMore, loadMore]);
};
import { useRef } from "react";
import SearchBar from "../components/MainPage/SearchBar";
import { GridList } from "../components/PokedexPage/GridList";
import { usePokemonLoader } from "../Hooks/usePokemonLoader";
import { useInfiniteScroll } from "../Hooks/useInfiniteScroll";

export default function PokedexPage() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { displayPokemons, isLoading, hasMore, loadMore } = usePokemonLoader();
    
    useInfiniteScroll(scrollContainerRef, isLoading, hasMore, loadMore);

    return (
        <div className="bg-background w-full h-screen rounded-l-2xl ml-[-20px] z-30">
            <div className="flex flex-col h-full">
                <div className="flex-shrink-0 pb-8 bg-accent shadow-xl">
                    <SearchBar />
                </div>

                {/* Kontener z przewijaniem */}
                <div 
                    ref={scrollContainerRef}
                    className="flex-1 overflow-y-auto hide-scrollbar"
                    style={{ height: 'calc(100vh - 160px)' }}
                >
                    <GridList 
                        items={displayPokemons}
                        isLoading={isLoading}
                        hasMore={hasMore}
                    />
                </div>
            </div>
        </div>
    );
}
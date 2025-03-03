import GridCard from "./GridCard";

interface GridListProps {
    items: string[];
    isLoading: boolean;
    hasMore: boolean;
}

export const GridList = ({ items, isLoading, hasMore }: GridListProps) => {
    
    return (
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-y-12 py-8 mx-auto justify-items-center overflow-y-auto">
            {items.map((name, index) => (
                <GridCard key={index} pokemonName={name} />
            ))}
            
            {isLoading && (
                <div className="col-span-full text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                </div>
            )}
            
            {!hasMore && (
                <div className="col-span-full text-center py-4 text-gray-500">
                    ~ Koniec listy Pokémonów ~
                </div>
            )}
        </div>
    );
};
import { useState, useEffect } from "react";
import { fetchPokemonList } from "../services/ApiService";

export const usePokemonLoader = () => {
    const [displayPokemons, setDisplayPokemons] = useState<string[]>([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = async () => {
        if (isLoading || !hasMore) return;
        
        setIsLoading(true);
        try {
            const data = await fetchPokemonList(offset);
            const newPokemons = data.results.map((p: { name: string }) => p.name);
            
            if (displayPokemons.length == 0) {
                setDisplayPokemons(newPokemons);
                setOffset(newPokemons.length);
            }
            else{
                if (newPokemons.length > 0) {
                    setDisplayPokemons(prev => [...prev, ...newPokemons]);
                    setOffset(prev => prev + newPokemons.length);
                } else {
                    setHasMore(false);
                }
            }
        } catch (error) {
            console.error("Błąd ładowania:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Pierwsze ładowanie
    useEffect(() => {
        loadMore();
    }, []);

    return { displayPokemons, isLoading, hasMore, loadMore };
};
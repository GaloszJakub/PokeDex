import { useState, useCallback } from "react";

const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

export const useAllPokemonsLoader = () => {
    const [allPokemons, setAllPokemons] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Funkcja do ładowania wszystkich Pokémonów
    const loadAllPokemons = useCallback(async () => {
        if (allPokemons.length > 0) return; // Nie pobieraj ponownie, jeśli są już wczytane

        setIsLoading(true);
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            const pokemonNames = data.results.map((pokemon: { name: string }) => pokemon.name);
            setAllPokemons(pokemonNames);
        } catch (error) {
            console.error("Error loading all Pokemons:", error);
        } finally {
            setIsLoading(false);
        }
    }, [allPokemons]);

    return { allPokemons, isLoading, loadAllPokemons };
};

import { useState, useCallback } from "react";

const BASE_API_URL = "https://pokeapi.co/api/v2/";


export const usePokemonByCategoryLoader = (category:string ) => {
    const [items, setItems] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Funkcja do ładowania elementów według kategorii
    const loadItemsByCategory = useCallback(async () => {
        if (items.length > 0) return; // Nie pobieraj ponownie, jeśli są już wczytane

        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_API_URL}${category}?limit=100000&offset=0`);
            const data = await response.json();

            const itemNames = data.results.map((item: { name: string }) => item.name);
            setItems(itemNames);
        } catch (error) {
            console.error(`Error loading all ${category}:`, error);
        } finally {
            setIsLoading(false);
        }
    }, [items, category]);

    return { items, isLoading, loadItemsByCategory };
};

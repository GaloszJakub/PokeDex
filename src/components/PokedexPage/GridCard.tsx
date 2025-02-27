import { useEffect, useState } from "react";
import { typeColors } from "../../utils/utils";
import { fetchPokemon } from "../../services/ApiService";
import Popup from "../Popup";

interface PokemonProps {
	pokemonName: string
}

interface PokemonStat {
    name: string;
    value: number;
}

interface PokemonData {
    name: string;
    image: string;
    types: string[];
    stats: PokemonStat[];
}

interface PokemonStat {
    name: string;
    value: number;
}

interface PokemonData {
    name: string;
    image: string;
    types: string[];
    stats: PokemonStat[];
}

export default function GridCard({ pokemonName }: PokemonProps) {
    const [pokemon, setPokemon] = useState<PokemonData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();

        async function getPokemon() {
            try {
                const data = await fetchPokemon(pokemonName, abortController.signal);
                setPokemon({
                    name: data.name,
                    image: data.sprites.other["official-artwork"].front_default,
                    types: data.types.map(t => t.type.name),
                    stats: data.stats.map(stat => ({
                        name: stat.stat.name,
                        value: stat.base_stat
                    }))
                });
            } catch (err) {
                if (!abortController.signal.aborted) {
                    setError(err instanceof Error ? err.message : "Nieznany błąd");
                }
            }
        }

        getPokemon();
        return () => abortController.abort();
    }, [pokemonName]);

	if (error) return <p className="text-red-500">{error}</p>
	if (!pokemon) return <p>Ładowanie...</p>

    return (
        <>
            <div 
                className="bg-main w-64 h-64 rounded-2xl shadow-xl p-4 hover:scale-110 duration-300 transform transition cursor-pointer"
                onClick={() => setIsPopupOpen(true)}
            >
                <div className="flex flex-col items-center">
                    <img 
                        src={pokemon.image} 
                        alt={pokemon.name} 
                        className="w-32 h-32 object-contain" 
                    />
                    <h2 className="text-lg font-bold capitalize">{pokemon.name}</h2>
                </div>
                <div className="mt-2">
                    <div className="flex justify-center gap-2 font-semibold text-md">
                        {pokemon.types.map((type) => (
                            <span
                                key={type}
                                className={`px-2 py-1 rounded-lg capitalize text-white mt-6 text-center hover:scale-110 duration-300 transform transition ${
                                    typeColors[type] || "bg-gray-500"
                                }`}
                            >
                                {type}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                <div className="flex flex-col space-y-8">
                    <div className="flex items-center gap-8">
                        <img 
                            src={pokemon.image} 
                            alt={pokemon.name} 
                            className="w-48 h-48 object-contain"
                        />
                        <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
                    </div>
                    <div className="flex gap-2 flex-wrap justify-center cursor-pointer">
                        {pokemon.types.map((type) => (
                            <span
                                key={type}
                                className={`px-3 py-1 rounded-full capitalize text-white hover:scale-110 duration-300 transform transition ${
                                    typeColors[type] || "bg-gray-500"
                                }`}
                            >
                                {type}
                            </span>
                        ))}
                    </div>
                    <div className="space-y-2">
                        {pokemon.stats.map(stat => (
                            <div key={stat.name} className="flex justify-between">
                                <span className="capitalize">{stat.name}:</span>
                                <span>{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Popup>
        </>
    );
}

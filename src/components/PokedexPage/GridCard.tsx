import { useEffect, useState } from "react";
import { typeColors } from "../../utils/utils";
import { fetchPokemon } from "../../Services/ApiService";

interface PokemonProps {
    pokemonName: string;
}

export default function GridCard({ pokemonName }: PokemonProps) {
    const [pokemon, setPokemon] = useState<{ name: string; image: string; types: string[] } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getPokemon() {
            try {
                const data = await fetchPokemon(pokemonName);
                setPokemon({
                    name: data.name,
                    image: data.sprites.other["official-artwork"].front_default,
                    types: data.types.map(t => t.type.name),
                });
            } catch (err) {
                setError("Nie udało się pobrać danych o Pokémonie.");
            }
        }

        getPokemon();
    }, [pokemonName]);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!pokemon) return <p>Ładowanie...</p>;

    return (
        <div className="bg-main w-64 h-64 rounded-2xl shadow-xl p-4">
            <div className="flex flex-col items-center cursor-pointer">
                <img src={pokemon.image} alt={pokemon.name} className="w-32 h-32 object-contain" />
                <h2 className="text-lg font-bold capitalize">{pokemon.name}</h2>
            </div>
            <div className="mt-2">
                <div className="flex justify-center gap-2 font-semibold text-md ">
                    {pokemon.types.map((type) => (
                        <span
                            key={type}
                            className={`px-2 py-1 rounded-lg  capitalize text-white mt-6 text-center cursor-pointer  ${
                                typeColors[type] || "bg-gray-500"
                            }`}
                        >
                            {type}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
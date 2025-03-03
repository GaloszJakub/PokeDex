import { useEffect, useState } from "react";
import { typeColors } from "../../utils/utils";
import { fetchPokemon } from "../../services/ApiService";
import Popup from "../Popup";
import PokemonStatsChart from "./StatsChart";



interface PokemonProps {
	pokemonName: string
}

interface PokemonStat {
    name: string;
    value: number;
}

interface abilities {
    name: string
    url: string
}

interface PokemonData {
    id:number;
    name: string;
    image: string;
    types: string[];
    stats: PokemonStat[];
    weaknesses: string[];
    abilities: abilities[];
    
}


export default function GridCard({ pokemonName }: PokemonProps) {
    const [pokemon, setPokemon] = useState<PokemonData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

   

    

    useEffect(() => {
        const abortController = new AbortController();

        async function getPokemon() {
            try {
                const data = await fetchPokemon(pokemonName);
                setPokemon({
                    id: data.id,
                    name: data.name,
                    image: data.sprites.other["official-artwork"].front_default,
                    types: data.types.map(t => t.type.name),
                    stats: data.stats.map(stat => ({
                        name: stat.stat.name,
                        value: stat.base_stat
                    })),
                    weaknesses: data.weaknesses,
                    abilities: data.abilities
                    
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
    console.log(pokemon)

    return (
        <>
            <div 
                className="bg-main w-64 h-64 rounded-2xl shadow-xl p-4 hover:scale-110 duration-300 transform transition cursor-pointer"
                onClick={() => setIsPopupOpen(true)}
            >
                <div className="flex flex-col items-center">
                    <div className="flex">
                        <img 
                            src={pokemon.image} 
                            alt={pokemon.name} 
                            className="w-32 h-32 object-contain" 
                        />
                        <p className="text-gray-500 end-0 text-end pr-2 absolute">#{pokemon.id}</p>
                     </div>

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
                <div className="flex flex-col space-y-8 ">
                    <p className="absolute end-8 text-2xl opacity-60">#{pokemon.id}</p>
                    <div className="flex flex-col  text-center items-center justify-center gap-8">
                        <img 
                            src={pokemon.image} 
                            alt={pokemon.name} 
                            className="w-48 h-48 object-contain"
                        />
                        <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
                    </div>
                    <div className="flex gap-2 flex-wrap justify-center ">
                        {pokemon.types.map((type) => (
                            <span
                                key={type}
                                
                                className={`px-3 py-1 rounded-full capitalize text-white hover:scale-110 duration-300 transform transition cursor-pointer ${
                                    typeColors[type] || "bg-gray-500"
                                }`}
                            >
                                {type}
                            </span>
                        ))}
                    </div>
                    <div className="mx-auto">
                        <PokemonStatsChart stats={pokemon.stats} />
                    </div>
                    <h2 className="text-2xl font-bold my-4">Weaknesses:</h2>
                    <div className="flex gap-4 flex-wrap">
                        
                        {pokemon.weaknesses.map((weakness) => (
                            <span
                            key={weakness}
                            className="px-3 text-md py-1  font-medium capitalize bg-red-100 text-red-800 rounded-full">
                            {weakness}
                        </span>
                        ))}
                    </div>
                    <h2 className="text-2xl font-bold">Abilities:</h2>
                    <div className="flex flex-col gap-2 pb-4 ">
                        {pokemon.abilities.map((ability) => (
                            <span 
                            key={ability.name}
                            className="bg-zinc-400 rounded-2xl capitalize text-md font-semibold px-2 py-1 w-max">
                                {ability.name}
                            </span>
                        ))}
                    </div>
                </div>
            </Popup>
            
        </>
    );
}

import { use, useEffect, useState } from "react"
import { fetchPokemon } from "../../Services/ApiService"


interface Sprites {
	other: {
		'official-artwork': {
			front_default: string
		}
	}
}

interface Type{
    type: {
        name: string
    }
}
interface PokemonData {
	name: string
	sprites: Sprites
    types: Type[]
}

export default function Header() {
    const [pokemon, setPokemon] = useState<PokemonData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        fetchPokemon('Genesect')
            .then(data => {
                setPokemon(data)
                setLoading(false)
            })
            .catch(err =>{
                setError(err.message)
                setLoading(false)
            })
            }, [])

    if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error}</div>

    
    return ( <div className="flex">
        <div className="p-36"> 
            <div className="flex gap-12" >
                <div className="basis-1/3">
                    <img src={pokemon?.sprites.other['official-artwork'].front_default} alt={pokemon?.name} />
                </div>
                <div className="flex flex-col basis-2/3">
                    <h2 className="font-bold text-4xl mb-4 capitalize pt-12">{pokemon?.name}</h2>
                    <div  className="flex w gap-4 mt-4">
                        <div className=" font-semibold">
                           
                            <div className="text-xl capitalize font-semibold gap-x-4 ">
                            <ul className="flex gap-x-4">
                                {pokemon?.types?.map((typeInfo) => (
                                    <li key={typeInfo.type.name}>{typeInfo.type.name}</li>
                                ))}
                            </ul>
                            </div>

                        </div>
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    </div>)
    }
// src/api.ts

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

export async function fetchPokemon(name: string): Promise<PokemonData> {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
	if (!res.ok) throw new Error('Błąd sieciowy')
	return res.json() as Promise<PokemonData>
}

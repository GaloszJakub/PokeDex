// src/services/ApiService.ts

//Abilites
interface NamedAPIResource {
	name: string
	url: string
}

export async function getAbilitiesList(): Promise<NamedAPIResource[]> {
	const response = await fetch('https://pokeapi.co/api/v2/ability?limit=1000')
	if (!response.ok) {
		throw new Error('Błąd sieci')
	}
	const data = await response.json()
	return data.results
}

//Items
interface NamedAPIResource {
	name: string
	url: string
}

export async function getItemsList(): Promise<NamedAPIResource[]> {
	const response = await fetch('https://pokeapi.co/api/v2/item?limit=1000')
	if (!response.ok) {
		throw new Error('Błąd sieci')
	}
	const data = await response.json()
	return data.results
}

//Moves
interface NamedAPIResource {
	name: string
	url: string
}

export async function getMovesList(): Promise<NamedAPIResource[]> {
	const response = await fetch('https://pokeapi.co/api/v2/move?limit=1000')
	if (!response.ok) {
		throw new Error('Błąd sieci')
	}
	const data = await response.json()
	return data.results
}

//Types + Obrazki
interface PokemonTypeData {
	pokemon: {
		pokemon: {
			name: string
			url: string
		}
	}[]
}

interface PokemonDetails {
	sprites: {
		other: {
			'official-artwork': {
				front_default: string
			}
		}
	}
	types: {
		type: {
			name: string
		}
	}[]
}

export const getPokemonByType = async (type: string) => {
	try {
		const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
		const typeData: PokemonTypeData = await typeResponse.json()

		const firstPokemon = typeData.pokemon[0].pokemon

		const pokemonResponse = await fetch(firstPokemon.url)
		const pokemonData: PokemonDetails = await pokemonResponse.json()

		return {
			type: type,
			image: pokemonData.sprites.other['official-artwork'].front_default,
		}
	} catch (error) {
		throw new Error(`Error fetching ${type} type Pokemon: ${error}`)
	}
}

//-----------------------------------------
interface Sprites {
	other: {
		'official-artwork': {
			front_default: string
		}
	}
}

interface Type {
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



// services/ApiService.ts
export async function fetchPokemonList(offset: number = 0, limit: number = 30) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    if (!response.ok) throw new Error("Failed to fetch Pokémon list");
    return response.json();
}
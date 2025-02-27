// src/services/ApiService.ts

//MainSlider
interface PokemonSpecies {
	flavor_text_entries: Array<{
		flavor_text: string
		language: { name: string }
	}>
}

interface TypeRelations {
	damage_relations: {
		double_damage_from: Array<{ name: string }>
	}
}

export interface PokemonDetails {
	id: number
	name: string
	sprites: {
		other: {
			'official-artwork': { front_default: string }
		}
	}
	types: Array<{ type: { name: string } }>
	description: string
	weaknesses: string[]
}

// src/services/ApiService.ts
export const fetchRandomPokemon = async (id: number): Promise<PokemonDetails> => {
	try {
		// Fetch basic pokemon data
		const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
		const pokemonData = await pokemonRes.json()

		// Fetch species data
		const speciesRes = await fetch(pokemonData.species.url)
		const speciesData: PokemonSpecies = await speciesRes.json()

		// Fetch type data correctly
		const typeUrls = pokemonData.types.map((t: any) => t.type.url)
		const typeResponses = await Promise.all(typeUrls.map((url: string) => fetch(url)))
		const typesData: TypeRelations[] = await Promise.all(typeResponses.map(res => res.json()))

		// Calculate weaknesses
		const weaknesses = Array.from(
			new Set(typesData.flatMap(t => t.damage_relations.double_damage_from.map((d: any) => d.name)))
		)

		return {
			id: pokemonData.id,
			name: pokemonData.name,
			sprites: pokemonData.sprites,
			types: pokemonData.types,
			description:
				speciesData.flavor_text_entries.find((e: any) => e.language.name === 'en')?.flavor_text ||
				'No description available',
			weaknesses,
		}
	} catch (error) {
		throw new Error(`Error fetching Pokemon ${id}: ${error}`)
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

interface Stat {
	base_stat: number // Brakowało tej wartości!
	stat: {
		name: string
	}
}

interface PokemonData {
	id: number
	name: string
	sprites: Sprites
	types: Type[]
	stats: Stat[]
}

export async function fetchPokemon(name: string, signal?: AbortSignal): Promise<PokemonData> {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
		signal,
	})

	if (!res.ok) {
		throw new Error(res.status === 404 ? 'Pokémon nie znaleziony' : 'Błąd serwera')
	}

	return res.json() as Promise<PokemonData>
}

// services/ApiService.ts
export async function fetchPokemonList(offset: number = 0, limit: number = 30) {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
	if (!response.ok) throw new Error('Failed to fetch Pokémon list')
	return response.json()
}

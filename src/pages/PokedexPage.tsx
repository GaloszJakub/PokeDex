import { useRef, useState, useMemo, useEffect } from 'react'
import SearchBar from '../components/MainPage/SearchBar'
import { GridList } from '../components/PokedexPage/GridList'
import { usePokemonLoader } from '../Hooks/usePokemonLoader'
import { useInfiniteScroll } from '../Hooks/useInfiniteScroll'
import { useAllPokemonsLoader } from '../Hooks/useAllPokemonLoader'

export default function PokedexPage() {
	const scrollContainerRef = useRef<HTMLDivElement>(null)
	const { displayPokemons, isLoading, hasMore, loadMore } = usePokemonLoader()
	const { allPokemons, isLoading: isLoadingAll, loadAllPokemons } = useAllPokemonsLoader() // Użycie hooka
	const [searchTerm, setSearchTerm] = useState('')

	useInfiniteScroll(scrollContainerRef, isLoading, hasMore, loadMore)

	// 🔹 Ładujemy wszystkie Pokemony, jeśli wpisano 2+ znaki
	useEffect(() => {
		if (searchTerm.length >= 2) {
			loadAllPokemons() // Wywołujemy funkcję ładowania wszystkich Pokémonów
		}
	}, [searchTerm, loadAllPokemons])

	// 🔹 Filtrowanie Pokémonów (z `allPokemons` lub `displayPokemons`)
	const filteredPokemons = useMemo(() => {
		if (searchTerm.length < 2) return displayPokemons
		return allPokemons.filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
	}, [searchTerm, displayPokemons, allPokemons])

	return (
		<div className="bg-background w-full h-screen rounded-l-2xl lg:pl-[270px] z-30">
			<div className="flex flex-col h-full">
				<div className="flex-shrink-0 pb-8 bg-accent shadow-xl py-10 justify-center flex">
					<SearchBar setSearch={setSearchTerm} />
				</div>

				{/* Kontener z przewijaniem */}
				<div
					ref={scrollContainerRef}
					className="flex-1 overflow-y-auto hide-scrollbar"
					style={{ height: 'calc(100vh - 160px)' }}>
					<GridList
						items={filteredPokemons} // Używamy przefiltrowanej listy
						isLoading={isLoading || isLoadingAll} // Ładowanie zarówno paginowane, jak i pełne
						hasMore={hasMore}
					/>
				</div>
			</div>
		</div>
	)
}

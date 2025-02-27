import { useRef } from 'react'
import SearchBar from '../components/MainPage/SearchBar'
import { GridList } from '../components/PokedexPage/GridList'
import { usePokemonLoader } from '../Hooks/usePokemonLoader'
import { useInfiniteScroll } from '../Hooks/useInfiniteScroll'

export default function PokedexPage() {
	const scrollContainerRef = useRef<HTMLDivElement>(null)
	const { displayPokemons, isLoading, hasMore, loadMore } = usePokemonLoader()

	useInfiniteScroll(scrollContainerRef, isLoading, hasMore, loadMore)

	return (
		<div className="bg-background min-h-screen rounded-l-2xl  z-30 lg:pl-[270px] w-full ">
			<div className="flex flex-col h-full">
				<div className="h-max flex justify-center w-full bg-accent py-10 shadow-xl">
					<SearchBar />
				</div>

				{/* Kontener z przewijaniem */}
				<div
					ref={scrollContainerRef}
					className="flex-1 overflow-y-auto hide-scrollbar "
					style={{ height: 'calc(100vh - 160px)' }}>
					<GridList items={displayPokemons} isLoading={isLoading} hasMore={hasMore} />
				</div>
			</div>
		</div>
	)
}

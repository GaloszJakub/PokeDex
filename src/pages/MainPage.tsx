import MainSlider from '../components/MainPage/MainSlider'
import PokemonOverview from '../components/MainPage/PokemonOverview'
import SearchBar from '../components/MainPage/SearchBar'
import TypeSlider from '../components/MainPage/TypeSlider'

export default function MainPage() {
	return (
		<div className="bg-[#e0e0e0] w-full h-screen rounded-l-2xl ml-[-20px] z-30">
			<div className="flex flex-col container mx-auto h-full">
				<SearchBar />
				<div className="flex-1 flex flex-col border my-10">
					<MainSlider />
					<div className="flex justify-around space-x-20 items-center h-[300px]">
						<TypeSlider />
						<PokemonOverview />
					</div>
				</div>
			</div>
		</div>
	)
}

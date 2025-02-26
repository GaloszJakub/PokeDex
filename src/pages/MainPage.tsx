import MainSlider from '../components/MainPage/MainSlider'
import PokemonOverview from '../components/MainPage/PokemonOverview'
import SearchBar from '../components/MainPage/SearchBar'
import TypeSlider from '../components/MainPage/TypeSlider'

export default function MainPage() {
	return (
		<div className="bg-[#e0e0e0] w-full h-screen rounded-l-2xl ml-[-20px] z-30 ">
			<div className="flex flex-col ">
				<SearchBar />
				<MainSlider />
				<div className="flex justify-around container mx-auto items-center h-[300px] border">
					<TypeSlider />
					<PokemonOverview />
				</div>
			</div>
		</div>
	)
}

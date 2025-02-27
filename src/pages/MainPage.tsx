import MainSlider from '../components/MainPage/MainSlider'
import PokemonOverview from '../components/MainPage/PokemonOverview'
import SearchBar from '../components/MainPage/SearchBar'
import TypeSlider from '../components/MainPage/TypeSlider'

export default function MainPage() {
	return (
		<div className="bg-[#e0e0e0] min-h-screen w-full lg:pl-[270px] pt-10">
			<div className="max-w-7lg mx-auto flex flex-col gap-6 xl:px-10 ">
				<div className="h-max flex justify-center w-full">
					<SearchBar />
				</div>

				<div className="">
					<MainSlider />
				</div>

				<div className="xl:flex flex-col xl:flex-row gap-8 items-center ">
					<div className="xl:w-3/8 ">
						<TypeSlider />
					</div>
					<div className="xl:w-5/8 xl:h-76 hidden xl:block ">
						<PokemonOverview />
					</div>
				</div>
			</div>
		</div>
	)
}

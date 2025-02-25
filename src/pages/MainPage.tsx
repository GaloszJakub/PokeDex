import MainSlider from '../components/MainPage/MainSlider'
import SearchBar from '../components/MainPage/SearchBar'

export default function MainPage() {
	return (
		<div className="bg-[#e0e0e0] w-full h-screen rounded-l-2xl ml-[-20px] z-30">
			<div className="flex flex-col ">
				<SearchBar />
				<MainSlider />
			</div>
		</div>
	)
}

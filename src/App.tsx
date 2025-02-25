import './App.css'
import Navbar from './components/Navbar'
import DetailsPage from './components/PokemonDetailsPage/DetailsPage'
import MainPage from './pages/MainPage'

function App() {
	return (
		<div className="flex">
			<Navbar />
			<DetailsPage />
			{/* <MainPage /> */}
		</div>
	)
}

export default App

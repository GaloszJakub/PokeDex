import './App.css'
import Navbar from './components/Navbar'
import MainPage from './pages/MainPage'
import { Routes, Route } from 'react-router-dom'
import PokedexPage from './pages/PokedexPage'

function App() {
	return (
		<div className="flex relative">
			<Navbar />
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/Pokedex" element={<PokedexPage />} />
			</Routes>
		</div>
	)
}

export default App

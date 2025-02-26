import { pokemonNames } from "../utils/utils";
import SearchBar from "../components/MainPage/SearchBar";
import GridCard from "../components/PokedexPage/GridCard";

export default function PokedexPage() {
    return (
        <div className="bg-background w-full h-screen rounded-l-2xl ml-[-20px] z-30">
            <div className="flex flex-col h-full  ">
                
                <div className="flex-shrink-0 pb-8 bg-accent shadow-xl">
                    <SearchBar />
                </div>

               
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-12  py-8 overflow-y-auto  4xl:ml-16 w-full 2xl:w-[90%] 4xl:w-[75%]  hide-scrollbar mx-auto justify-items-center">
                    {pokemonNames.map((name, index) => (
                        <GridCard key={index} pokemonName={name} />
                    ))}
                </div>
            </div>
        </div>
    );
}
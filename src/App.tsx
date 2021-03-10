import React from "react";

import Oscillator from "./components/Oscillator/Oscillator";
import Filter from "./components/Filter/Filter";
import ADSR from "./components/ADSR/ADSR";
import MasterAudio from "./components/MasterAudio/MasterAudio";
import Keyboard from "./components/Keyboard/Keyboard";
import "./styles/index.css";

function App() {
	return (
		<div className="md:h-screen md:p-4 md:bg-blue-100">
			{/* // ---Card component---------- */}
			<div className="flex flex-col p-6 bg-white 2xl:mx-24 2xl:rounded-xl shadow-2xl md:h-full  ">
				<h1 className="mx-auto text-center text-xl md:text-6xl">Web Synth 101</h1>
				<div className="flex flex-col flex-grow ">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
						<MasterAudio />
						<Oscillator />
						<ADSR />
						<Filter />
					</div>
					<div className="bg-gray-300 rounded-lg shadow-xl mt-2 p-8 col-start-1 flex flex-col text-center h-48  md:h-full  ">
						<Keyboard />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;

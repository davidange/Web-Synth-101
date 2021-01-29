import React from "react";

import Oscillator from "./components/Oscillator/Oscillator";
import Filter from "./components/Filter/Filter";
import ADSR from "./components/ADSR/ADSR";
import MasterAudio from "./components/MasterAudio/MasterAudio";
import Keyboard from "./components/Keyboard/Keyboard";
import "./styles/index.css";

function App() {
	return (
		// ---Card component----------

		<div className="grid  p-6 bg-white xl:mx-96 xl:mt-16 xl:rounded-xl shadow-2xl">
			<h1 className="mx-auto text-center text-xl md:text-6xl">Web Synth 101</h1>
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
				<MasterAudio />
				<Oscillator />
				<ADSR />
				<Filter />
			</div>
			<div className="bg-gray-300 rounded-lg shadow-xl mt-2 p-8 col-start-1 flex flex-col text-center ">
				<Keyboard />
			</div>
		</div>
	);
}

export default App;

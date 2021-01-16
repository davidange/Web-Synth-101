import React, { useContext } from "react";
import { context } from "./context/Store";
import Oscillator from "./components/Oscillator/Oscillator";
import Filter from "./components/Filter/Filter";
import ADSR from "./components/ADSR/ADSR";
import MasterAudio from "./components/MasterAudio/MasterAudio";
import Keyboard from "./components/Keyboard/Keyboard";
import "./styles/index.css";

function App() {
	const { dispatch } = useContext(context);

	return (
		// ---Card component----------

		<div className="grid  mx-auto p-6 bg-white">
			<h1 className="mx-auto text-center text-xl">Oscillator</h1>
			<div className="grid grid-cols-2 sm:grid-cols-3  gap-4" >
				<MasterAudio />
				<Oscillator />
				<ADSR />
				<Filter />
			</div>
			<Keyboard />
		</div>
	);
}

export default App;

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
		<>
			<div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-xl mt-8">
				<h1>Settings</h1>
				<MasterAudio />
				<Oscillator />
				<ADSR />
				<Filter />
			</div>
			<Keyboard />
		</>
	);
}

export default App;

import React, { useContext } from "react";
import { context } from "./context/Store";
import * as actionTypes from "./context/actions/actionTypes";
import Oscillator from "./components/Oscillator/Oscillator";
import Filter from "./components/Filter/Filter";
import ADSR from "./components/ADSR/ADSR";
import Keyboard from "./components/Keyboard/Keyboard";
import "./styles/index.css";

function App() {
	const { dispatch } = useContext(context);

	return (
		// ---Card component----------
		<>
			<div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-xl mt-8">
				<h1>Sliders</h1>
				<Oscillator />
				<ADSR />
				<Filter />
			</div>
			<Keyboard />
		</>
	);
}

export default App;

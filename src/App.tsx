import React, { useContext } from "react";
import { context } from "./context/Store";
import * as actionTypes from "./context/actions/actionTypes";
import Oscillator from "./components/Oscillator/Oscillator";
import Filter from "./components/Filter/Filter";
import "./styles/index.css";

function App() {
	const { state: appState, dispatch } = useContext(context);

	return (
		// ---Card component----------
		<div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-xl mt-8">
			<h1>Sliders</h1>
			<div className="flex space-x-4 w-full py-2">
				<button className="btn-main w-full" onClick={() => dispatch({ type: actionTypes.START_OSC })}>
					Start
				</button>
				<button className="btn-main w-full" onClick={() => dispatch({ type: actionTypes.STOP_OSC })}>
					Stop
				</button>
			</div>
			<Oscillator />
			<Filter />
		</div>
	);
}

export default App;

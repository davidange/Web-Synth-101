import React, { useContext } from "react";
import { context } from "../../context/Store";
import * as actionTypes from "../../context/actions/actionTypes";

const Oscillator: React.FC = () => {
	const { state: appState, dispatch: updateState } = useContext(context);
	let { detune, type } = appState.osc1Settings;
	const change = (e: React.ChangeEvent<HTMLInputElement>) => {
		let { value, name } = e.target;
		updateState({ type: actionTypes.CHANGE_OSC1, payload: { id: name, value: +value } });
	};
	const changeType = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		let name = (e.target as HTMLInputElement).name;
		updateState({ type: actionTypes.CHANGE_OSC1_TYPE, payload: { id: name } });
	};

	return (
		<div className="bg-gray-300 rounded-lg shadow-xl mt-2 p-2 flex flex-col justify-center text-center">
			<h2> Oscillator</h2>
			<div>
				<h3>detune</h3>
				<input onChange={change} type="range" name="detune" value={detune} />
			</div>

			<div className="flex flex-col m-2 ">
				<h3>wave</h3>
				{/* Map the buttons of all the oscilator types */}
				{["sine", "sawtooth", "square", "triangle"].map((oscillatorType) => (
					<button
						className={"btn btn-secondary mt-2 " + ((type as string) === oscillatorType ? "btn-secondary-active " : "")}
						name={oscillatorType}
						key={oscillatorType}
						onClick={changeType}
					>
						{oscillatorType}
					</button>
				))}
			</div>
		</div>
	);
};

export default Oscillator;

import React, { useContext } from "react";
import { context } from "../../context/Store";
import * as actionTypes from "../../context/actions/actionTypes";
import Knob from "../CustomKnob/CustomKnob";

let detuneMax = 200;
const Oscillator: React.FC = () => {
	const { state: appState, dispatch: updateState } = useContext(context);
	let { detune, type } = appState.osc1Settings;
	const change = (value: number, name: string) => {
		updateState({ type: actionTypes.CHANGE_OSC1, payload: { id: name, value: value } });
	};
	const changeType = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		let name = (e.target as HTMLInputElement).name;
		updateState({ type: actionTypes.CHANGE_OSC1_TYPE, payload: { id: name } });
	};

	return (
		<div className="bg-gray-300 rounded-lg shadow-xl mt-2  pt-4 text-center lg:row-start-2 ">
			<h2> Oscillator</h2>
			<div className="p-2 flex flex-col justify-center xl:flex-row  ">
				<div className="m-2">
					<h3>Detune</h3>
					<Knob
						max={detuneMax}
						value={detune}
						onChange={(val) => change(val, "detune")}
						min={0}
						preciseMode
						step={1}
						unlockDistance={50}
						rotateDegrees={180}
						clampMin={30}
						clampMax={330}
						style={{ margin: "0 auto" }}
					/>
					<h4>{(detune / detuneMax).toFixed(2)}</h4>
				</div>

				<div className="flex flex-col m-2 ">
					<h3>wave</h3>
					{/* Map the buttons of all the oscilator types */}
					<div className="grid grid-cols-2">
						{["sine", "sawtooth", "square", "triangle"].map((oscillatorType) => (
							<div className="flex items-center" key={oscillatorType}>
								<button
									className={
										"btn btn-secondary mt-2 mx-1 " +
										((type as string) === oscillatorType ? "btn-secondary-active " : "")
									}
									name={oscillatorType}
									onClick={changeType}
								></button>
								<label className="text-xs">{oscillatorType}</label>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Oscillator;

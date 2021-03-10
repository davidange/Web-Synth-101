import React, { useContext } from "react";
import { context } from "../../context/Store";
import * as actionTypes from "../../context/actions/actionTypes";
import "../../styles/index.css";
import Knob from "../CustomKnob/CustomKnob";

const biquadFilterTypesUnusedParameters = {
	allpass: ["gain"],
	bandpass: ["gain"],
	highpass: ["gain"],
	highshelf: ["Q"],
	lowpass: ["gain"],
	lowshelf: ["Q"],
	notch: ["gain"],
	peaking: [],
};

const biquadFilterTypes: string[] = [];
for (let key in biquadFilterTypesUnusedParameters) {
	biquadFilterTypes.push(key);
}

let detuneMax = 200;
const Filter: React.FC = () => {
	const { state: appState, dispatch: updateState } = useContext(context);
	let { frequency, detune, type, Q, gain } = appState.filterSettings;
	const change = (value: number, name: string) => {
		updateState({ type: actionTypes.CHANGE_FIL, payload: { id: name, value: value } });
	};
	const changeType = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		let name = (e.target as HTMLInputElement).name;
		updateState({ type: actionTypes.CHANGE_FIL_TYPE, payload: { id: name } });
	};

	return (
		<div className="bg-gray-300 rounded-lg shadow-xl mt-2 pt-4 flex flex-col  text-center md:row-span-2">
			<h2> Filter</h2>
			<div className="p-2 flex flex-col justify-between h-full">
				<div className="flex flex-row  justify-evenly flex-wrap ">
					<div className="m-2">
						<h3>Frequency</h3>
						<Knob
							max={10000}
							value={frequency}
							onChange={(val) => change(val, "frequency")}
							min={0}
							preciseMode
							step={1}
							unlockDistance={50}
							rotateDegrees={180}
							clampMin={30}
							clampMax={330}
							style={{ margin: "0 auto ", width: "40px", height: "40px" }}
						/>
						<h4>{frequency.toFixed(0)}</h4>
					</div>
					<div className="m-2">
						<h3>Detune</h3>
						<Knob
							max={detuneMax}
							value={detune}
							onChange={(val) => change(val, "detune")}
							min={0}
							preciseMode
							step={0.01}
							unlockDistance={50}
							rotateDegrees={180}
							clampMin={30}
							clampMax={330}
							style={{ margin: "0 auto", width: "40px", height: "40px" }}
						/>
						<h4>{(detune / detuneMax).toFixed(2)}</h4>
					</div>
					<div className="m-2" hidden={(biquadFilterTypesUnusedParameters[type] as string[]).includes("Q")}>
						<h3>Q</h3>
						<Knob
							max={10}
							value={Q}
							onChange={(val) => change(val, "Q")}
							min={0}
							preciseMode
							step={0.1}
							unlockDistance={50}
							rotateDegrees={180}
							clampMin={30}
							clampMax={330}
							style={{ margin: "0 auto", width: "40px", height: "40px" }}
						/>
						<h4>{Q.toFixed(2)}</h4>
					</div>
					<div className="m-2" hidden={(biquadFilterTypesUnusedParameters[type] as string[]).includes("gain")}>
						<h3>Gain</h3>
						<Knob
							max={10}
							value={gain}
							onChange={(val) => change(val, "gain")}
							min={0}
							preciseMode
							step={0.1}
							unlockDistance={50}
							rotateDegrees={180}
							clampMin={30}
							clampMax={330}
							style={{ margin: "0 auto", width: "40px", height: "40px" }}
						/>
						<h4>{gain.toFixed(2)}</h4>
					</div>
				</div>
				<div className="flex flex-col m-2 ">
					<h3>Filter Type:</h3>
					{/* Map the buttons of all the oscilator types */}
					<div className="grid grid-cols-2">
						{biquadFilterTypes.map((filterType) => (
							<div className="flex items-center" key={filterType}>
								<button
									className={
										"btn btn-secondary mt-2  mx-1 " + ((type as string) === filterType ? "btn-secondary-active " : "")
									}
									name={filterType}
									key={filterType}
									onClick={changeType}
								/>
								<label className="text-xs">{filterType.charAt(0).toUpperCase() + filterType.slice(1)}</label>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Filter;

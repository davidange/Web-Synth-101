import React from "react";
import "../../styles/index.css";
interface Props {
	change: (event: React.ChangeEvent<HTMLInputElement>) => void;
	changeType: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	settings: {
		frequency: number;
		detune: number;
		type: BiquadFilterType;
		Q: number;
		gain: number;
	};
}

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

const Filter: React.FC<Props> = ({ change, changeType, settings }) => {
	let { frequency, detune, type, Q, gain } = settings;
	return (
		<div className="bg-gray-300 rounded-lg shadow-xl mt-2 p-2 flex flex-col justify-center text-center">
			<h2> Filter</h2>
			<div>
				<h3>frequency</h3>
				<input onChange={change} max="10000" type="range" id="frequency" value={frequency} />
			</div>
			<div>
				<h3>detune</h3>
				<input onChange={change} type="range" id="detune" value={detune} />
			</div>
			<div>
				<h3>Q</h3>
				<input
					onChange={change}
					type="range"
					id="Q"
					value={Q}
					max="10"
					step="0.1"
					disabled={(biquadFilterTypesUnusedParameters[type] as string[]).includes("Q")}
				/>
			</div>
			<div>
				<h3>gain</h3>
				<input
					onChange={change}
					type="range"
					id="gain"
					value={gain}
					max="10"
					step="0.1"
					disabled={(biquadFilterTypesUnusedParameters[type] as string[]).includes("gain")}
				/>
			</div>

			<div className="flex flex-col m-2 ">
				<h3>filterType</h3>
				{/* Map the buttons of all the oscilator types */}
				{biquadFilterTypes.map((filterType) => (
					<button
						className={"btn btn-secondary mt-2 " + ((type as string) === filterType ? "btn-secondary-active " : "")}
						id={filterType}
						key={filterType}
						onClick={changeType}
					>
						{filterType}
					</button>
				))}
			</div>
		</div>
	);
};

export default Filter;

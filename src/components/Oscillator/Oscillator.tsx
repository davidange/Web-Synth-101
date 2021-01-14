import React from "react";
import "../../styles/index.css";
interface Props {
	change: (event: React.ChangeEvent<HTMLInputElement>) => void;
	changeType: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	settings: {
		frequency: number;
		detune: number;
		type: OscillatorType;
	};
}

const Oscillator: React.FC<Props> = ({ change, changeType, settings }) => {
	let { frequency, detune, type } = settings;
	return (
		<div className="bg-gray-300 rounded-lg shadow-xl mt-2 p-2 flex flex-col justify-center text-center">
			<h2> osc1</h2>
			<div>
				<h3>frequency</h3>
				<input onChange={change} max="5000" type="range" id="frequency" value={frequency} />
			</div>
			<div>
				<h3>detune</h3>
				<input onChange={change} type="range" id="detune" value={detune} />
			</div>

			<div className="flex flex-col m-2 ">
				<h3>wave</h3>
				{/* Map the buttons of all the oscilator types */}
				{["sine", "sawtooth", "square", "triangle"].map((oscillatorType) => (
					<button
						className={"btn btn-secondary mt-2 " + ((type as string) === oscillatorType ? "btn-secondary-active " : "")}
						id={oscillatorType}
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

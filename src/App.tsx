import React, { useState } from "react";
import Oscillator from "./components/Oscillator/Oscillator";
import Filter from "./components/Filter/Filter";
import "./styles/index.css";

let actx: AudioContext = new AudioContext();
let out: AudioDestinationNode = actx.destination;
let osc1: OscillatorNode = actx.createOscillator();
let gain1: GainNode = actx.createGain();
let filter: BiquadFilterNode = actx.createBiquadFilter();

osc1.connect(gain1);
gain1.connect(filter);
filter.connect(out);

function App() {
	const [osc1Settings, setOsc1Settings] = useState({
		frequency: osc1.frequency.value,
		detune: osc1.detune.value,
		type: osc1.type,
	});
	const [filterSettings, setFilterSettings] = useState({
		frequency: filter.frequency.value,
		detune: filter.detune.value,
		type: filter.type,
		Q: filter.Q.value,
		gain: filter.gain.value,
	});

	const changeOsc1 = (e: React.ChangeEvent<HTMLInputElement>) => {
		let { value, id } = e.target;
		setOsc1Settings({ ...osc1Settings, [id]: +value });
		(osc1[id as keyof OscillatorNode]! as any).value = +value;
	};

	const changeOsc1Type = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		let id = (e.target as HTMLElement).id as OscillatorType;
		osc1.type = id;
		setOsc1Settings({ ...osc1Settings, type: id });
	};

	const changeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		let { value, id } = e.target;
		setFilterSettings({ ...filterSettings, [id]: +value });
		(filter[id as keyof BiquadFilterNode]! as any).value = +value;
	};

	const changeFilterType =(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		let id = (e.target as HTMLElement).id as BiquadFilterType;
		filter.type=id;
		setFilterSettings({ ...filterSettings, type: id });
	};
	console.log(filterSettings);
	return (
		// ---Card component----------
		<div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-xl mt-8">
			<h1>Sliders</h1>
			<div className="flex space-x-4 w-full py-2">
				<button className="btn-main w-full" onClick={() => osc1.start()}>
					Start
				</button>
				<button className="btn-main w-full" onClick={() => osc1.stop()}>
					Stop
				</button>
			</div>
			<Oscillator change={changeOsc1} settings={osc1Settings} changeType={changeOsc1Type} />
			<Filter change={changeFilter} settings={filterSettings} changeType={changeFilterType} />
		</div>
	);
}

export default App;

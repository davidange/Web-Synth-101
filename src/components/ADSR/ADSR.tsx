import React, { useContext } from "react";
import { context } from "../../context/Store";
import * as actionTypes from "../../context/actions/actionTypes";
const ADSR = () => {
	const { state: appState, dispatch: updateState } = useContext(context);
	let { attack, decay, release, sustain } = appState.envelope;
	const change = (e: React.ChangeEvent<HTMLInputElement>) => {
		let { value, id } = e.target;
		updateState({ type: actionTypes.CHANGE_ENVELOPE, payload: { id, value: +value } });
	};
	return (
		<div className="bg-gray-300 rounded-lg shadow-xl mt-2 p-2 flex flex-col justify-center text-center">
			<h2>ADSR</h2>
			<div>
				<h3>attack</h3>
				<input onChange={change} type="range" id="attack" value={attack} max="2" step="0.02" />
			</div>
			<div>
				<h3>decay</h3>
				<input onChange={change} type="range" id="decay" max="1" step="0.01" value={decay} />
			</div>
			<div>
				<h3>sustain</h3>
				<input onChange={change} type="range" id="sustain" max="1" step="0.01" value={sustain} />
			</div>
			<div>
				<h3>release</h3>
				<input onChange={change} type="range" id="release" value={release} max="2" step="0.02" />
			</div>
		</div>
	);
};

export default ADSR;

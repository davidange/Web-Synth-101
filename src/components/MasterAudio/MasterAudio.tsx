import React, { useContext } from "react";
import { context } from "../../context/Store";
import * as actionTypes from "../../context/actions/actionTypes";

const MasterAudio = () => {
	const { state: appState, dispatch: updateState } = useContext(context);
	let { gain } = appState.masterGain;
	const change = (e: React.ChangeEvent<HTMLInputElement>) => {
		let { value, name } = e.target;
		console.log(name);
		updateState({ type: actionTypes.CHANGE_MASTER_GAIN, payload: { id:name, value: +value } });
	};
	return (
		<div className="bg-gray-300 rounded-lg shadow-xl mt-2 p-2 flex flex-col justify-center text-center">
			<h2>Master Volume</h2>
			<div>
				<h3>Volume</h3>
				<input onChange={change} type="range" value={gain} max="1.5" step="0.02" name="gain" />
			</div>
		</div>
	);
};

export default MasterAudio;

import React, { useContext } from "react";
import { context } from "../../context/Store";
import * as actionTypes from "../../context/actions/actionTypes";
import Knob from "../CustomKnob/CustomKnob";

const MasterAudio = () => {
	const { state: appState, dispatch: updateState } = useContext(context);
	let { gain } = appState.masterGain;
	const change = (value: number, name: string) => {
		updateState({ type: actionTypes.CHANGE_MASTER_GAIN, payload: { id: name, value: value } });
	};
	return (
		<div className="bg-gray-300 rounded-lg shadow-xl mt-2 p-2 col-start-1 flex flex-col text-center">
			<h2>Master Volume</h2>
			<div className="mx-auto">
				<h3 className=" inline-block">Volume</h3>
				<Knob
					max={1}
					value={gain}
					onChange={(val) => change(val, "gain")}
					min={0}
					preciseMode
					step={0.02}
					unlockDistance={50}
					rotateDegrees={180}
					clampMin={30}
					clampMax={330}
					style={{ margin:"0 auto"}}
				/>
				<h4>{gain.toFixed(2)}</h4>
			</div>
		</div>
	);
};

export default MasterAudio;

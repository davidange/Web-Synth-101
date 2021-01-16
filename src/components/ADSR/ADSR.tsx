import React, { useContext } from "react";
import { context } from "../../context/Store";
import * as actionTypes from "../../context/actions/actionTypes";
import Knob from "../CustomKnob/CustomKnob";

let attackMax = 2;

const ADSR = () => {
	const { state: appState, dispatch: updateState } = useContext(context);
	let { attack, decay, release, sustain } = appState.envelope;
	const change = (value: number, name: string) => {
		updateState({ type: actionTypes.CHANGE_ENVELOPE, payload: { id: name, value } });
	};
	return (
		<div className="bg-gray-300 rounded-lg shadow-xl mt-2 pt-4 flex flex-col  text-center lg:row-span-2">
			<h2>ADSR</h2>
			<div className="grid grid-cols-2 justify-center p-2">
				<div className="m-2">
					<h3>Attack</h3>
					<Knob
						max={attackMax}
						value={attack}
						onChange={(val) => change(val, "attack")}
						min={0}
						preciseMode
						step={0.001}
						unlockDistance={50}
						rotateDegrees={180}
						clampMin={30}
						clampMax={330}
						style={{ margin: "0 auto" }}
					/>
					<h4>{attack.toFixed(3) + " s"}</h4>
				</div>
				<div className="m-2">
					<h3>Decay</h3>
					<Knob
						max={1}
						value={decay}
						onChange={(val) => change(val, "decay")}
						min={0}
						preciseMode
						step={0.001}
						unlockDistance={50}
						rotateDegrees={180}
						clampMin={30}
						clampMax={330}
						style={{ margin: "0 auto" }}
					/>
					<h4>{decay.toFixed(3) + " s"}</h4>
				</div>
				<div className="m-2">
					<h3>Sustain</h3>
					<Knob
						max={1}
						value={sustain}
						onChange={(val) => change(val, "sustain")}
						min={0}
						preciseMode
						step={0.01}
						unlockDistance={50}
						rotateDegrees={180}
						clampMin={30}
						clampMax={330}
						style={{ margin: "0 auto" }}
					/>
					<h4>{sustain.toFixed(2)}</h4>
				</div>
				<div className="m-2">
					<h3>Release</h3>
					<Knob
						max={2}
						value={release}
						onChange={(val) => change(val, "release")}
						min={0}
						preciseMode
						step={0.001}
						unlockDistance={50}
						rotateDegrees={180}
						clampMin={30}
						clampMax={330}
						style={{ margin: "0 auto" }}
					/>
					<h4>{release.toFixed(3) + " s"}</h4>
				</div>
			</div>
		</div>
	);
};

export default ADSR;

import React, { useContext } from "react";
import { context } from "../../context/Store";
import * as actionTypes from "../../context/actions/actionTypes";
import Knob from "../CustomKnob/CustomKnob";
import ADSRPlot from "./ADSRPlot/ADSRPlot";

let attackMax = 2;
let decayMax = 1;
let releaseMax = 2;
const ADSR = () => {
	const { state: appState, dispatch: updateState } = useContext(context);
	let { attack, decay, release, sustain } = appState.envelope;
	const change = (value: number, name: string) => {
		updateState({ type: actionTypes.CHANGE_ENVELOPE, payload: { id: name, value } });
	};
	return (
		<div className="bg-gray-300 rounded-lg shadow-xl mt-2 pt-4 flex flex-col  text-center md:row-span-2">
			<h2>ADSR</h2>
			<div className="h-full">
				<div className="grid grid-cols-2 justify-center p-2  lg:grid-cols-4">
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
							style={{ margin: "0 auto", width: "40px", height: "40px" }}
						/>
						<h4>{attack.toFixed(3) + " s"}</h4>
					</div>
					<div className="m-2">
						<h3>Decay</h3>
						<Knob
							max={decayMax}
							value={decay}
							onChange={(val) => change(val, "decay")}
							min={0}
							preciseMode
							step={0.001}
							unlockDistance={50}
							rotateDegrees={180}
							clampMin={30}
							clampMax={330}
							style={{ margin: "0 auto", width: "40px", height: "40px" }}
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
							style={{ margin: "0 auto", width: "40px", height: "40px" }}
						/>
						<h4>{sustain.toFixed(2)}</h4>
					</div>
					<div className="m-2">
						<h3>Release</h3>
						<Knob
							max={releaseMax}
							value={release}
							onChange={(val) => change(val, "release")}
							min={0}
							preciseMode
							step={0.001}
							unlockDistance={50}
							rotateDegrees={180}
							clampMin={30}
							clampMax={330}
							style={{ margin: "0 auto", width: "40px", height: "40px" }}
						/>
						<h4>{release.toFixed(3) + " s"}</h4>
					</div>
				</div>

				<ADSRPlot
					{...appState.envelope}
					totalTime={attackMax + decayMax + releaseMax}
					className="bg-gray-400 rounded-lg m-1 shadow-xl p-2"
				/>
			</div>
		</div>
	);
};

export default ADSR;

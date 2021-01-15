import React, { createContext, useReducer } from "react";
import * as actionTypes from "./actions/actionTypes";
import Oscillator, { ASDR } from "../util/oscillator";

let audioContext: AudioContext = new AudioContext();
let out: AudioDestinationNode = audioContext.destination;
let gain1: GainNode = audioContext.createGain();
let filter: BiquadFilterNode = audioContext.createBiquadFilter();

gain1.connect(filter);
filter.connect(out);

let nodes: Oscillator[] = [];

interface IState {
	osc1Settings: {
		detune: number;
		type: OscillatorType;
	};
	filterSettings: {
		frequency: number;
		detune: number;
		type: BiquadFilterType;
		Q: number;
		gain: number;
	};
	envelope: ASDR;
}
type Action = ChangeValueAction | ChangeTypeAction | MakeOSCAction | KillOSCAction;

interface ChangeValueAction {
	type: actionTypes.CHANGE_OSC1 | actionTypes.CHANGE_FIL | actionTypes.CHANGE_ENVELOPE;
	payload: { id: string; value: number };
}
interface ChangeTypeAction {
	type: actionTypes.CHANGE_OSC1_TYPE | actionTypes.CHANGE_FIL_TYPE;
	payload: { id: string };
}

interface MakeOSCAction {
	type: actionTypes.MAKE_OSC;
	payload: { note: string; freq: number };
}
interface KillOSCAction {
	type: actionTypes.KILL_OSC;
	payload: { note: string; freq: number };
}

function reducer(state: IState, action: Action) {
	switch (action.type) {
		case actionTypes.MAKE_OSC:
			const newOsc = new Oscillator(
				audioContext,
				state.osc1Settings.type,
				action.payload.freq,
				state.osc1Settings.detune,
				gain1,
				state.envelope
			);
			nodes.push(newOsc);
			return { ...state };
		case actionTypes.KILL_OSC:
			nodes = nodes.filter((osc) => {
				if (Math.round(osc.oscillator.frequency.value) !== Math.round(action.payload.freq)) {
					return true;
				} else {
					osc.stop();
					return false;
				}
			});
			return { ...state };
		case actionTypes.CHANGE_OSC1:
			let { id, value } = action.payload!;
			return { ...state, osc1Settings: { ...state.osc1Settings, [id]: value } };
		case actionTypes.CHANGE_OSC1_TYPE:
			return { ...state, osc1Settings: { ...state.osc1Settings, type: action.payload.id as OscillatorType } };
		case actionTypes.CHANGE_FIL:
			(filter[action.payload.id as keyof BiquadFilterNode] as any).value = action.payload.value;
			return { ...state, filterSettings: { ...state.filterSettings, [action.payload.id]: action.payload.value } };
		case actionTypes.CHANGE_FIL_TYPE:
			filter.type = action.payload!.id as BiquadFilterType;
			return { ...state, filterSettings: { ...state.filterSettings, type: action.payload.id as BiquadFilterType } };
		case actionTypes.CHANGE_ENVELOPE:
			return { ...state, envelope: { ...state.envelope, [action.payload.id]: action.payload.value } };
		default:
			return { ...state };
	}
}

const context = createContext({} as { state: IState; dispatch: (action: Action) => void });
export { context };

export default function StoreProvider(props: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(reducer, {
		osc1Settings: {
			detune: 0,
			type: "sine",
		},
		filterSettings: {
			frequency: filter.frequency.value,
			detune: filter.detune.value,
			type: filter.type,
			Q: filter.Q.value,
			gain: filter.gain.value,
		},
		envelope: {
			attack: 0.005,
			decay: 0.1,
			sustain: 0.6,
			release: 0.1,
		},
	});
	const value = { state, dispatch };
	return <context.Provider value={value}>{props.children}</context.Provider>;
}

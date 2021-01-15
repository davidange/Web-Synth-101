import { SSL_OP_PKCS1_CHECK_1 } from "constants";
import React, { createContext, useReducer } from "react";
import * as actionTypes from "./actions/actionTypes";

let actx: AudioContext = new AudioContext();
let out: AudioDestinationNode = actx.destination;
let osc1: OscillatorNode = actx.createOscillator();
let gain1: GainNode = actx.createGain();
let filter: BiquadFilterNode = actx.createBiquadFilter();

osc1.connect(gain1);
gain1.connect(filter);
filter.connect(out);

interface IState {
	osc1Settings: {
		frequency: number;
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
}
type Action = BaseAction | ChangeValueAction | ChangeeTypeAction;

interface BaseAction {
	type: actionTypes.START_OSC | actionTypes.STOP_OSC;
}
interface ChangeValueAction {
	type: actionTypes.CHANGE_OSC1 | actionTypes.CHANGE_FIL;
	payload: { id: string; value: number };
}
interface ChangeeTypeAction {
	type: actionTypes.CHANGE_OSC1_TYPE | actionTypes.CHANGE_FIL_TYPE;
	payload: { id: string };
}

function reducer(state: IState, action: Action) {
	switch (action.type) {
		case actionTypes.START_OSC:
			osc1.start();
			return { ...state };
		case actionTypes.STOP_OSC:
			osc1.stop();
			return { ...state };
		case actionTypes.CHANGE_OSC1:
			let { id, value } = action.payload!;
			(osc1[id as keyof OscillatorNode]! as any).value = value;
			return { ...state, osc1Settings: { ...state.osc1Settings, [id]: value } };
		case actionTypes.CHANGE_OSC1_TYPE:
			osc1.type = action.payload!.id as OscillatorType;
			return { ...state, osc1Settings: { ...state.osc1Settings, type: (action.payload.id as OscillatorType) } };
		case actionTypes.CHANGE_FIL:
			(filter[action.payload.id as keyof BiquadFilterNode] as any).value = action.payload.value;
			return { ...state, filterSettings: { ...state.filterSettings, [action.payload.id]: action.payload.value } };
		case actionTypes.CHANGE_FIL_TYPE:
			filter.type = action.payload!.id as BiquadFilterType;
			return { ...state, filterSettings: { ...state.filterSettings, type: (action.payload.id as BiquadFilterType) } };
		default:
			return state;
	}
}

const context = createContext({} as { state: IState; dispatch: (action: Action) => void });
export { context };

export default function StoreProvider(props: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(reducer, {
		osc1Settings: {
			frequency: osc1.frequency.value,
			detune: osc1.detune.value,
			type: osc1.type,
		},
		filterSettings: {
			frequency: filter.frequency.value,
			detune: filter.detune.value,
			type: filter.type,
			Q: filter.Q.value,
			gain: filter.gain.value,
		},
	});
	const value = { state, dispatch };
	return <context.Provider value={value}>{props.children}</context.Provider>;
}

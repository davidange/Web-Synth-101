import React, { createContext, useReducer } from "react";
import * as actionTypes from "./actions/actionTypes";
import Oscillator, { ASDR } from "../util/oscillator";

let audioContext: AudioContext = new AudioContext();
let out: AudioDestinationNode = audioContext.destination;
let gain1: GainNode = audioContext.createGain();
let filter: BiquadFilterNode = audioContext.createBiquadFilter();
let masterGain: GainNode = audioContext.createGain();

gain1.connect(filter);
filter.connect(masterGain);
masterGain.connect(out);

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
	masterGain: {
		gain: number;
	};
	audioContextResumed: boolean;
}
type Action = ChangeValueAction | ChangeTypeAction | MakeOSCAction | KillOSCAction | StartAudioContext;

interface ChangeValueAction {
	type:
		| typeof actionTypes.CHANGE_OSC1
		| typeof actionTypes.CHANGE_FIL
		| typeof actionTypes.CHANGE_ENVELOPE
		| typeof actionTypes.CHANGE_MASTER_GAIN;
	payload: { id: string; value: number };
}
interface ChangeTypeAction {
	type: typeof actionTypes.CHANGE_OSC1_TYPE | typeof actionTypes.CHANGE_FIL_TYPE;
	payload: { id: string };
}

interface MakeOSCAction {
	type: typeof actionTypes.MAKE_OSC;
	payload: { note: string; freq: number };
}
interface KillOSCAction {
	type: typeof actionTypes.KILL_OSC;
	payload: { note: string; freq: number };
}
interface StartAudioContext {
	type: typeof actionTypes.START_AUDIO_CONTEXT;
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
		case actionTypes.CHANGE_MASTER_GAIN:
			if (action.payload.id === "gain") {
				masterGain.gain.value = action.payload.value;
			}
			return { ...state, masterGain: { ...state.masterGain, [action.payload.id]: action.payload.value } };
		case actionTypes.START_AUDIO_CONTEXT:
			if (state.audioContextResumed !== true) {
				audioContext.resume().then(() => console.log("Playback Resumed"));
			}
			return { ...state, audioContextResumed: true };
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
		masterGain: {
			gain: masterGain.gain.value,
		},
		audioContextResumed: false,
	});
	const value = { state, dispatch };
	return <context.Provider value={value}>{props.children}</context.Provider>;
}

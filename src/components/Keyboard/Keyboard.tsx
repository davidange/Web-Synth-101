import React, { useContext } from "react";
import { context } from "../../context/Store";
import * as actionTypes from "../../context/actions/actionTypes";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import { getFrequency } from "../../util/notes";

const firstNote = MidiNumbers.fromNote("c3");
const lastNote = MidiNumbers.fromNote("e4");
const keyboardShortcuts = KeyboardShortcuts.create({
	firstNote: firstNote,
	lastNote: lastNote,
	keyboardConfig: KeyboardShortcuts.BOTTOM_ROW,
});
const Keyboard = () => {
	const { dispatch: updateState } = useContext(context);
	const keyboardPressed = (midiNumber: number) => {
		// Play a given note - see notes below;
		let note = MidiNumbers.getAttributes(midiNumber).note;
		let frequency = getFrequency(MidiNumbers.getAttributes(midiNumber).note);
		updateState({ type: actionTypes.MAKE_OSC, payload: { note, freq: frequency } });
	};
	const keyboardReleased = (midiNumber: number) => {
		// Stop playing a given note - see notes below
		let note = MidiNumbers.getAttributes(midiNumber).note;
		let frequency = getFrequency(MidiNumbers.getAttributes(midiNumber).note);
		updateState({ type: actionTypes.KILL_OSC, payload: { note, freq: frequency } });
	};
	return (
		<div className="max-w-md mx-auto my-4 p-6 bg-white rounded-lg shadow-xl">
			<Piano
				noteRange={{ first: firstNote, last: lastNote }}
				playNote={keyboardPressed}
				stopNote={keyboardReleased}
				width={400}
				keyboardShortcuts={keyboardShortcuts}
			/>
		</div>
	);
};

export default Keyboard;

declare module "react-piano" {
	interface PianoProps {
		noteRange: {};
		activeNotes?: number[];
		playNote: (MidiNote: number) => void;
		stopNote: (MidiNote: number) => void;
		onPlayNoteInput?: () => void;
		onStopNoteInput?: () => void;
		renderNoteLabel?: () => void;
		className?: string;
		disabled?: boolean;
		width?: number;
		keyWidthToHeight?: number;
		keyboardShortcuts?: keyboardShortcuts;
	}

	interface KeyboardShortcuts {
		create: (settings: { firstNote: number; lastNote: number; keyboardConfig: keyboardConfig }) => keyboardShortcuts;
		BOTTOM_ROW: keyboardConfig;
		HOME_ROW: keyboardConfig;
		QWERTY_ROW: keyboardConfig;
	}

	type keyboardConfig = {
		natural: string;
		flat: string;
		sharp: string;
	}[];

	type keyboardShortcuts = { key: string; midiNumber: string }[];

	interface MidiNumbers {
		fromNote: (note: string) => number;
		getAttributes: (
			midiNumber: number
		) => {
			note: string;
			pitchName: string;
			octave: number;
			midiNumber: number;
			isAccidental: boolean;
		};
		MIN_MIDI_NUMBER: number;
		MAX_MIDI_NUMBER: number;
		NATURAL_MIDI_NUMBERS: number[];
	}

	export const MidiNumbers: MidiNumbers;
	export const KeyboardShortcuts: KeyboardShortcuts;
	export const Piano: (props: PianoProps) => JSX.Element;
}

//There are 12 Notes per octave.
const SORTED_PITCHES = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
interface Pitch_Indexes {
	C: 0;
	"C#": 1;
	Db: 1;
	D: 2;
	"D#": 3;
	Eb: 3;
	E: 4;
	F: 5;
	"F#": 6;
	Gb: 6;
	G: 7;
	"G#": 8;
	Ab: 8;
	A: 9;
	"A#": 10;
	Bb: 10;
	B: 11;
}
const PITCH_INDEXES: Pitch_Indexes = {
	C: 0,
	"C#": 1,
	Db: 1,
	D: 2,
	"D#": 3,
	Eb: 3,
	E: 4,
	F: 5,
	"F#": 6,
	Gb: 6,
	G: 7,
	"G#": 8,
	Ab: 8,
	A: 9,
	"A#": 10,
	Bb: 10,
	B: 11,
};

const indexOfNote = (pitch: string, octave: number) => {
	return PITCH_INDEXES[pitch as keyof Pitch_Indexes] + SORTED_PITCHES.length * octave;
};

const baseFrequency = 440; //A4 (Note A, Octave 4)
const baseIndex = indexOfNote("A", 4); //Index of A4

//Calculates the Frequency of A Note and its octave (Example A5 = 880Hz)
export const getFrequency = (note: string) => {
	let pitch = note.substring(0, note.length - 1);
	let octave = +note.slice(-1);
	let distance = indexOfNote(pitch, octave) - baseIndex;
	return baseFrequency * Math.pow(2, distance / 12);
};

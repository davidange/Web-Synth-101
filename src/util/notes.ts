//There are 12 Notes per octave.
import { notes } from "../data/notes.json";

const indexOfNote = (note: string, octave: number) => {
	return notes.indexOf(note) + notes.length * octave;
};

const baseFrequency = 440; //A4 (Note A, Octave 4)
const baseIndex = indexOfNote("A", 4); //Index of A4

//Calculates the Frequency of A Note and its octave (Example A 5 = 880Hz)
export const getFrequency = (note: string, octave: number) => {
	let distance = indexOfNote(note, octave) - baseIndex;
	return baseFrequency * Math.pow(2, distance / 12);
};

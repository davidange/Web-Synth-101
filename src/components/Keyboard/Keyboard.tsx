import React, { useContext, useEffect } from "react";
import { context } from "../../context/Store";
import * as actionTypes from "../../context/actions/actionTypes";
import QwertyHancock from "qwerty-hancock";
const Keyboard = () => {
	const { dispatch: updateState } = useContext(context);
	useEffect(() => {
		const keyboard = new QwertyHancock({
			id: "keyboard",
			width: 410,
			height: 70,
			octaves: 2,
			startNote: "C4",
		});
		keyboard.keyDown = (note, frequency) => {
			updateState({ type: actionTypes.MAKE_OSC, payload: { note, freq: frequency } });
		};
		keyboard.keyUp = (note, frequency) => {
			updateState({ type: actionTypes.KILL_OSC, payload: { note, freq: frequency } });
		};
	}, [updateState]);

	return (
		<div className="max-w-md mx-auto my-4 p-6 bg-white rounded-lg shadow-xl">
			<div id="keyboard"></div>
		</div>
	);
};

export default Keyboard;

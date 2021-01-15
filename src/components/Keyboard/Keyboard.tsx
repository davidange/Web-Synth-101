import React, { useContext, useEffect } from "react";
import { context } from "../../context/Store";
import * as actionTypes from "../../context/actions/actionTypes";
import QwertyHancock from "qwerty-hancock";
const Keyboard = () => {
	const { state: appState, dispatch: updateState } = useContext(context);
	useEffect(() => {
		const keyboard = new QwertyHancock({
			id: "keyboard",
			width: "450",
			height: "70",
			octaves: 2,
			startNote: "C4",
		});
	}, []);

	return (
		<div>
			<div id="keyboard"></div>
		</div>
	);
};

export default Keyboard;

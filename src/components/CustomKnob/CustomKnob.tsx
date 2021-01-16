import React from "react";
import { Knob, KnobProps } from "react-rotary-knob";
import * as skins from "react-rotary-knob-skin-pack";

const CustomKnob = (props: KnobProps) => {
	return (
		<div>
			<Knob skin={skins.s13} {...props} />
		</div>
	);
};

export default CustomKnob;

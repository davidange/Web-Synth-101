import React, { FunctionComponent } from "react";

interface Props {
	/** Frequency */
	frequency?: number;
}
export const TunerDial: FunctionComponent<Props> = ({ frequency }) => {
	return (
		<div>
			<p>{frequency ? frequency : "N/A"}</p>
		</div>
	);
};

declare module "qwerty-hancock" {
	interface QwertyKeyboardOptions {
		id: string;
		width?: number | string;
		height?: number | string;
		octaves?: number;
		startNote?: string;
		whiteNotesColour?: string;
		blackNotesColour?: string;
		hoverColour?: string;
	}
	export default class QwertyHancock {
		constructor(options?: QwertyKeyboardOptions);
		keyDown: (...any:any[]) => void;
		keyUp: (...any:any[]) => void;
	}
}

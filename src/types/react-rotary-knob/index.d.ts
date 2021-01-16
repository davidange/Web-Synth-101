declare module "react-rotary-knob" {
	type AttributeSetValue = {
		name: string;
		value: (props: any, value: any) => string;
	};
	type UpdateElement = {
		element: string;
		content: ?((props: any, value: any) => string);
		attrs: Array<AttributeSetValue>;
	};
	type Skin = {
		svg: string;
		knobX: number;
		knobY: number;
		updateAttributes: Array<UpdateElement>;
	};

	type KnobProps = {
		value?: number;
		defaultValue?: number;
		clampMin?: number;
		clampMax?: number;
		rotateDegrees?: number;
		min?: number;
		max?: number;
		skin?: Skin;
		format?: (val: number) => string;
		onChange?: (val: number) => void;
		onStart?: () => void;
		onEnd?: () => void;
		style?: any;
		preciseMode?: boolean;
		unlockDistance?: number;
		step?: number;
	};

	export const Knob: (props: KnobProps) => JSX.Element;
}

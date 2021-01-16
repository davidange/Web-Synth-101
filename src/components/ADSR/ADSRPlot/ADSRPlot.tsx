import React, { useCallback } from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import styles from "./styles.module.css";
import sizeMe from "react-sizeme";

interface Props {
	attack: number;
	decay: number;
	release: number;
	sustain: number;
	totalTime?: number;
	className?: string;
	style?: any;
	size?: { height: number | null; width: number; position: number | null };
}
type Coordinates = [x: number, y: number];

const ADSRPlot = (props: Props) => {
	let { attack, decay, release, sustain, totalTime, style, className, size } = props;
	//Default Value for TotalTime
	let width: number = (size?.width as number) * 0.9;
	let height = width * 0.5;
	console.log(size);
	console.log(width);
	if (!totalTime) {
		totalTime = 5;
	}
	//Sustain Time for Visual
	const sustainTime = 1;
	totalTime = totalTime + sustainTime;
	//Default offset between borders
	let paddingX = (1 / 15) * width;
	let paddingY = (1 / 15) * height;

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(width, height).parent(canvasParentRef);
	};
	const draw = (p5: p5Types) => {
		// p5.point(width * (1 - offset), height * offset);
		p5.frameRate(30);
		p5.background(0);
		//Draw Bottom Line
		p5.stroke(153);
		p5.line(0, p5.map(0, 0, 1, height - paddingY, paddingY), width, p5.map(0, 0, 1, height - paddingY, paddingY));
		//drawADSRPlot
		drawADSRPlot(p5, attack, sustain, decay, release);
	};

	const drawADSRPlot = useCallback(
		(p5: p5Types, attack: number, sustain: number, decay: number, release: number) => {
			let mappedCoordinates: Coordinates[] = [
				[0, 0],
				[attack, 1],
				[attack + decay, sustain],
				[attack + decay + sustainTime, sustain],
				[attack + decay + sustainTime + release, 0],
			].map((coordinate) => [
				p5.map(coordinate[0], totalTime!, 0, width - paddingX, paddingX),
				p5.map(coordinate[1], 0, 1, height - paddingY, paddingY),
			]);

			//Curve
			p5.fill(255,255,255,50);
			p5.beginShape();
			for (let i = 0; i < mappedCoordinates.length; i++) {
				p5.vertex(mappedCoordinates[i][0], mappedCoordinates[i][1]);
			}
			p5.endShape();
			//Points:
			p5.fill(0);
			for (let i = 0; i < mappedCoordinates.length; i++) {
				p5.circle(mappedCoordinates[i][0], mappedCoordinates[i][1], 10);
			}
		},
		[height, paddingX, paddingY, totalTime, width]
	);
	const windowResized = (p5: p5Types) => {
		p5.resizeCanvas(width, height);
		p5.redraw();
	};
	return (
		<Sketch
			setup={setup}
			draw={draw}
			windowResized={windowResized}
			className={className + " " + styles.centeredInnerDiv}
			style={style}
		/>
	);
};

export default sizeMe()(ADSRPlot);

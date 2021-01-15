export interface ASDR {
	attack: number;
	decay: number;
	sustain: number;
	release: number;
}

export default class Oscillator {
	audioContext: AudioContext;
	envelope: ASDR;
	oscillator: OscillatorNode;
	gateGain: GainNode;
	//offset for when Value will start playing
	easing = 0.005;

	constructor(
		audioContext: AudioContext,
		type: OscillatorType,
		frequency: number,
		detune: number,
		connection: AudioNode,
		envelope?: ASDR
	) {
		this.audioContext = audioContext;
		this.envelope = envelope || {
			attack: 0.005,
			decay: 0.1,
			sustain: 0.6,
			release: 0.1,
		};
		this.oscillator = audioContext.createOscillator();
		this.oscillator.frequency.value = frequency;
		this.oscillator.detune.value = detune;
		this.oscillator.type = type;

		//osscilator is first connected to gateGain(ASDR) and then to connection
		this.gateGain = audioContext.createGain();
		this.oscillator.connect(this.gateGain);
		this.gateGain.connect(connection);

		this.oscillator.start();
		this.start();
	}
	start() {
		let { currentTime } = this.audioContext;
		this.gateGain.gain.cancelScheduledValues(currentTime);
		this.gateGain.gain.setValueAtTime(0, currentTime + this.easing);
		this.gateGain.gain.linearRampToValueAtTime(1, currentTime + this.envelope.attack + this.easing);
		this.gateGain.gain.linearRampToValueAtTime(
			this.envelope.sustain,
			currentTime + this.envelope.attack + this.envelope.decay + this.easing
		);
	}
	stop() {
		let { currentTime } = this.audioContext;
		this.gateGain.gain.cancelScheduledValues(currentTime);
		//Exponential Decay of value
		this.gateGain.gain.setTargetAtTime(0, currentTime, this.envelope.release + this.easing);

		//disconnect oscillator
		setTimeout(() => {
			this.oscillator.disconnect();
		}, 10000);
	}
}

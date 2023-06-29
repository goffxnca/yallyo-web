export interface ISoundMeterInterface {
  context: AudioContext;
  instant: number;
  // slow: number;
  // clip: number;
  script: ScriptProcessorNode;
  mic: MediaStreamAudioSourceNode | null;
  onSpeak: Function;

  connectToSource(
    stream: MediaStream,
    callback?: (error: Error | null) => void
  ): void;
  stop(): void;
}

export class SoundMeter implements ISoundMeterInterface {
  context: AudioContext;
  instant: number;
  // slow: number;
  // clip: number;
  script: ScriptProcessorNode;
  mic: MediaStreamAudioSourceNode | null;
  onSpeak: Function;
  counter: number;

  constructor(context: AudioContext, onSpeak: Function) {
    this.context = context;
    this.instant = 0.0;
    // this.slow = 0.0;
    // this.clip = 0.0;

    // 1024 => 10secs = 500 cbs
    // 2048 => 10secs = 250 cbs
    // 4096 => 10secs = 125 cbs
    // 16384 => 10secs = 32 cbs
    // Formula: callbacks = audioContext.sampleRate(48000) / (bufferSize)1024 ≈ 46.875 callbacks per second, hence  bufferSize=1024 for 10secs = ~468 cbs
    // Formula: callbacks = audioContext.sampleRate(48000) / (bufferSize)16384 ≈ 2.92 callbacks per second, hence  bufferSize=1024 for 10secs = ~29 cbs
    // As for now belieaves, the higher buffersize the better overall purf because we get less callbacks, and we have larger samples to process at a time.
    this.script = context.createScriptProcessor(16384, 1, 1);
    this.mic = null;
    this.onSpeak = onSpeak;
    this.counter = 0;

    this.script.onaudioprocess = (event: AudioProcessingEvent) => {
      this.counter += 1;

      const input = event.inputBuffer.getChannelData(0);
      let sum = 0.0;
      // let clipcount = 0;

      for (let i = 0; i < input.length; ++i) {
        sum += input[i] * input[i];
        // if (Math.abs(input[i]) > 0.99) {
        //   clipcount += 1;
        // }
      }

      this.instant = Math.sqrt(sum / input.length);
      // this.slow = 0.95 * this.slow + 0.05 * this.instant;
      // this.clip = clipcount / input.length;

      // console.log("how fast is this?" + this.instant);
      if (this.instant > 0.02) {
        this.onSpeak(this.instant);
      }
    };
  }

  connectToSource(
    stream: MediaStream,
    callback?: (error: Error | null) => void
  ): void {
    console.log("SoundMeter connecting");
    try {
      this.mic = this.context.createMediaStreamSource(stream);
      this.mic.connect(this.script);
      // Necessary to make sample run, but should not be.
      this.script.connect(this.context.destination);
      if (typeof callback !== "undefined") {
        callback(null);
      }
    } catch (e: any) {
      console.error(e);
      if (typeof callback !== "undefined") {
        callback(e);
      }
    }
  }

  stop(): void {
    console.log("SoundMeter stopping");
    if (this.mic) {
      this.mic.disconnect();
    }
    this.script.disconnect();
  }
}

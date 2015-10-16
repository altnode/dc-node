import AltAudioNode from "altnode.alt-audio-node";
import { VALUE, BUFSRC } from "./symbols";
import createDCBuffer from "./createDCBuffer";

export default class DCNode extends AltAudioNode {
  constructor(audioContext, value = 0) {
    super(audioContext);

    this[VALUE] = value;
    this[BUFSRC] = audioContext.createBufferSource();
    this[BUFSRC].buffer = createDCBuffer(audioContext, value, 128);
    this[BUFSRC].loop = true;
  }

  get value() {
    return this[VALUE];
  }

  start(...args) {
    this[BUFSRC].start(...args);
  }

  stop(...args) {
    this[BUFSRC].stop(...args);
  }

  connect(...args) {
    this[BUFSRC].connect(...args);
  }

  disconnect(...args) {
    this[BUFSRC].disconnect(...args);
  }

  dispose() {
    /* eslint-disable no-empty */
    try {
      this[BUFSRC].stop(this.context.currentTime);
    } catch (e) {}
    this[BUFSRC].disconnect();
    this[BUFSRC] = null;
  }
}

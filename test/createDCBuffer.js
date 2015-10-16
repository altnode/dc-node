import assert from "power-assert";
import createDCBuffer from "../src/createDCBuffer";

describe("createDCBuffer(audioContext: AudioContext, value: number, length: number)", () => {
  it("works", () => {
    let audioContext = new global.AudioContext();
    let buffer = createDCBuffer(audioContext, 100, 16);

    assert(buffer instanceof global.AudioBuffer);
    assert(buffer.numberOfChannels === 1);
    assert(buffer.length === 16);
    assert(buffer.sampleRate === audioContext.sampleRate);

    assert.deepEqual(buffer.getChannelData(0), new Float32Array([
      100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100
    ]));
  });
});

import assert from "power-assert";
import sinon from "sinon";
import DCNode from "../src/DCNode";
import { BUFSRC } from "../src/symbols";

describe("DCNode", () => {
  let audioContext = null;

  beforeEach(() => {
    audioContext = new global.AudioContext();
  });

  describe("constructor(audioContext: AudioContext, value = 0)", () => {
    it("works", () => {
      let dc = new DCNode(audioContext);

      assert(dc instanceof DCNode);
    });
  });
  describe("#value: number", () => {
    it("works", () => {
      let value = Math.fround(Math.random());
      let dc = new DCNode(audioContext, value);

      assert(dc.value === value);
    });
  });
  describe("#start(when: number): void", () => {
    it("works", () => {
      let dc = new DCNode(audioContext);

      dc[BUFSRC].start = sinon.spy(dc[BUFSRC].start.bind(dc[BUFSRC]));

      dc.start(1);

      assert(dc[BUFSRC].start.callCount === 1);
      assert(dc[BUFSRC].start.args[0][0] === 1);
    });
  });
  describe("#stop(when: number): void", () => {
    it("works", () => {
      let dc = new DCNode(audioContext);

      dc[BUFSRC].stop = sinon.spy(dc[BUFSRC].stop.bind(dc[BUFSRC]));

      dc.start(1);
      dc.stop(2);

      assert(dc[BUFSRC].stop.callCount === 1);
      assert(dc[BUFSRC].stop.args[0][0] === 2);
    });
  });
  describe("#connect(...args): void", () => {
    it("works", () => {
      let dc = new DCNode(audioContext);

      dc.connect(audioContext.destination);

      assert(audioContext.destination.$isConnectedFrom(dc[BUFSRC]));
    });
  });
  describe("#disconnect(...args): void", () => {
    it("works", () => {
      let dc = new DCNode(audioContext);

      dc.connect(audioContext.destination);
      dc.disconnect();

      assert(!audioContext.destination.$isConnectedFrom(dc[BUFSRC]));
    });
  });
  describe("#dispose(...args): void", () => {
    it("works", () => {
      let dc = new DCNode(audioContext);

      dc.dispose();

      assert.throws(() => {
        dc.dispose();
      });
    });
  });
  describe("graph", () => {
    it("works", () => {
      let dc = new DCNode(audioContext);

      dc.connect(audioContext.destination);

      assert.deepEqual(audioContext.destination.toJSON(), {
        name: "AudioDestinationNode",
        inputs: [
          {
            name: "AudioBufferSourceNode",
            buffer: {
              name: "AudioBuffer",
              sampleRate: 44100,
              length: 128,
              duration: 128 / 44100,
              numberOfChannels: 1
            },
            playbackRate: {
              value: 1,
              inputs: []
            },
            loop: true,
            loopStart: 0,
            loopEnd: 0,
            inputs: []
          }
        ]
      });
    });
  });
  describe("buffer", () => {
    it("works", () => {
      let dc = new DCNode(audioContext, Math.fround(Math.random()));
      let buffer = dc[BUFSRC].buffer;
      let bufferData = [].slice.call(buffer.getChannelData(0));

      assert(buffer.numberOfChannels === 1);
      assert(bufferData.every(value => value === dc.value));
    });
  });
});

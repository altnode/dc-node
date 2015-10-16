export default function createDCBuffer(audioContext, value, length) {
  let buffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
  let data = new Float32Array(length);

  for (let i = 0; i < length; i++) {
    data[i] = value;
  }

  buffer.getChannelData(0).set(data);

  return buffer;
}

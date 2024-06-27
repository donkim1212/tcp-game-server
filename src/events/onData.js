import { config } from "../config/config.js";

// curring
export const onData = (socket) => (data) => {
  // data received as chunk, keep concatting data to the socket's buffer
  socket.buffer = Buffer.concat([socket.buffer, data]);
  const totalHeaderLength = config.packet.totalLength + config.packet.typeLength;
  while (socket.buffer.length >= totalHeaderLength) {
    const length = socket.buffer.readInt32BE(0);
    const packetType = socket.buffer.readInt8(config.packet.totalLength);

    if (socket.buffer.length < length) {
      // 아직 패킷이 다 도착하지 않음
      break;
    }

    const packet = socket.buffer.subarray(totalHeaderLength, length);
    socket.buffer = socket.buffer.subarray(length);

    console.log(`length: ${length}  pakcetType: ${packetType}`);
    console.log(`packet: ${packet}`);
  }
};

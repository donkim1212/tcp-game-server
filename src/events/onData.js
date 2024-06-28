import { config } from "../config/config.js";
import { PACKET_TYPE } from "../constants/header.js";
import { getHandlerById } from "../handlers/index.js";
import { packetParser } from "../lib/utils/parser/packetParser.js";
import { getUserById } from "../session/user.session.js";

// curring
export const onData = (socket) => async (data) => {
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

    switch (packetType) {
      case PACKET_TYPE.PING:
        break;
      case PACKET_TYPE.NORMAL:
        const { handlerId, userId, payload, sequence } = packetParser(packet);
        const user = getUserById(userId);
        if (user && user.sequence !== sequence) {
          console.error(`잘못된 호출값입니다.`);
        }
        const handler = getHandlerById(handlerId);

        await handler({ socket, userId, payload });
        console.log(`handlerId: ${handlerId}`);
        console.log(`userId: ${userId}`);
        console.log(`payload: ${payload}`);
        console.log(`sequence: ${sequence}`);
    }

    console.log(`length: ${length}  pakcetType: ${packetType}`);
    console.log(`packet: ${packet}`);
  }
};

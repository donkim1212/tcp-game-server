import { config } from "../../../config/config.js";
import { PACKET_TYPE } from "../../../constants/header.js";
import { getProtoMessages } from "../../../init/loadProtos.js";
import { getNextSequence } from "../../../session/user.session.js";

export const createResponse = (handlerId, userId, responseCode, data = null) => {
  const protoMessages = getProtoMessages();
  const Response = protoMessages.response.Response;

  const responsePayload = {
    handlerId,
    responseCode,
    timestamp: Date.now(),
    data: data ? Buffer.from(data) : null,
    sequence: userId ? getNextSequence(userId) : 0,
  };

  const buffer = Response.encode(responsePayload).finish();

  const packetLength = Buffer.alloc(config.packet.totalLength);
  packetLength.writeInt32BE(buffer.length + config.packet.totalLength + config.packet.typeLength, 0);

  const packetType = Buffer.alloc(config.packet.packetType);
  packetType.writeInt8(PACKET_TYPE.NORMAL, 0);

  return buffer.concat([packetLength, packetType, buffer]);
};

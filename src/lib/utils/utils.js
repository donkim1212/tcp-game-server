import { config } from "../../config/config.js";

export const readHeader = (buffer) => {
  // Big Endian (BE), Little Endian (LE)
  return {
    length: buffer.readInt32BE(0),
    packetType: buffer.readInt8(config.packet.totalLength),
  };
};

/**
 *
 * @param {number} length length of the data
 * @param {number} packetType packet's type
 * @returns header buffer
 */
export const writeHeader = (length, packetType) => {
  const headerSize = config.packet.totalLength + config.packet.typeLength;
  const buffer = Buffer.alloc(headerSize);
  buffer.writeInt32BE(length + headerSize, 0); // data's length + header's size
  buffer.writeInt8(packetType, config.packet.totalLength);
  return buffer;
};

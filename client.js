import net from "net";
import { writeHeader, readHeader } from "./src/lib/utils/utils.js";
import { config } from "./src/config/config.js";

const HOST = "127.0.0.1";
const PORT = 5555;

const client = new net.Socket();

client.connect(PORT, HOST, () => {
  console.log("Connected to the server...");

  const message = "Hello, World!";
  // const message = "V".repeat(1024);
  const buffer = Buffer.from(message);

  const header = writeHeader(buffer.length, 11);
  const packet = Buffer.concat([header, buffer]);
  client.write(packet); //
});

client.on("data", (data) => {
  // data : Buffer, Buffer 객체는 Byte 배열: 56 30 1c ff 9a ...
  const { length, packetType } = readHeader(data);
  console.log("length: ", length);
  console.log("handlerId: ", packetType);
  const buffer = Buffer.from(data);

  const headerSize = config.packet.totalLength + config.packet.typeLength;
  const message = buffer.subarray(headerSize);
  console.log(`server에게 받은 메세지: ${message}`);
  console.log("message: ", message);
  console.log("string: ", buffer.toString());
  console.log("json: ", buffer.toJSON());
});

client.on("close", () => {
  // 양 쪽의 연결이 완전히 끝났을 때
  console.log(`Connection closed.`);
});

client.on("error", (err) => {
  console.log(`Client error: ${err}`);
});

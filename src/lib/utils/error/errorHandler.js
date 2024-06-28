import { createResponse } from "../response/createResponse.js";
import { ErrorCodes } from "./errorCodes.js";

export const handleError = (socket, error) => {
  let responseCode;
  let message;
  console.error(error);

  if (error.code) {
    responseCode = error.code;
    message = error.message;
    console.error(`에러코드: ${error.code}, 메세지: ${error.message}`);
  } else {
    responseCode = ErrorCodes.SOCKET_ERROR;
    message = error.message;
    console.Error(`일반에러: ${error.message}`);
  }

  const errorResponse = createResponse(-1, null, responseCode, { message });
  socket.write(errorResponse);
};

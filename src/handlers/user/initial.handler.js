import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from "../../constants/handlerIds.js";
import { createResponse } from "../../lib/utils/response/createResponse.js";
import { addUser } from "../../session/user.session.js";

const initialHandler = async ({ socket, userId, payload }) => {
  const { deviceId } = payload;

  addUser(socket, deviceId);

  const initialResponse = createResponse(HANDLER_IDS.INITIAL, deviceId, RESPONSE_SUCCESS_CODE, { userId: deviceId });

  // 뭔가 처리가 끝났을 때 보내는 것
  socket.write("");
};

export default initialHandler;

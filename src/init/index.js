import { loadGameAssets } from "./assets.js";
import { loadProtos } from "./loadProtos.js";

const initServer = async () => {
  try {
    await loadGameAssets();
    await loadProtos();
  } catch (e) {
    console.error(e);
    // TODO: 에러 로그 처리
    process.exit(1);
  }
};

export default initServer;

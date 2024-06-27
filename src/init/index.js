import { loadGameAssets } from "./assets.js";

const initServer = async () => {
  try {
    await loadGameAssets();
  } catch (e) {
    console.error(e);
    // TODO: 에러 로그 처리
    process.exit(1);
  }
};

export default initServer;

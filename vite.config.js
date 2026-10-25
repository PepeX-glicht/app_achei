import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default {
  root: fileURLToPath(new URL("./src", import.meta.url)),
  build: {
    outDir: fileURLToPath(new URL("./dist", import.meta.url)),
    emptyOutDir: true
  },
  server: {
    fs: {
      allow: [projectRoot]
    }
  }
};

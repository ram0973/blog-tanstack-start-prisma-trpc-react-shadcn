import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@tanstack/react-start/config";
import viteTsConfigPaths from "vite-tsconfig-paths";
//import mkcert from 'vite-plugin-mkcert'
import basicSsl from "@vitejs/plugin-basic-ssl";
import { resolve } from "path";
import { readFileSync } from "fs";

export default defineConfig({
  tsr: {
    appDirectory: "src",
  },
  server: {
    // https: {
    //   key: "./certs/localhost-key.pem",
    //   cert: "./certs/localhost-cert.pem",
    // },
  },
  // server: {
  //   //https: true, // Включает самоподписанный сертификат

  //   // https: {
  //   //   cert: Bun.file readFileSync(resolve('./certs/cert.pem')).toString(),
  //   //   key: readFileSync(resolve('./certs/key.pem')).toString(),
  //   // },
  // },
  vite: {
    plugins: [
      // this is the plugin that enables path aliases
      viteTsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
      tailwindcss(),
      //mkcert(),
      //basicSsl({ certDir: "./certs" }),
    ],
  },
});

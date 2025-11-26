// @ts-check
import { defineConfig, envField } from "astro/config";
import svelte from "@astrojs/svelte";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],

  env: {
    schema: {
      APPLICATION_NAME: envField.string({
        context: "server",
        access: "secret",
      }),
      API_KEY: envField.string({ context: "server", access: "secret" }),
      SHARED_SECRET: envField.string({ context: "server", access: "secret" }),
      REGISTERED_TO: envField.string({ context: "server", access: "public" }),
    },
  },

  adapter: vercel(),
});
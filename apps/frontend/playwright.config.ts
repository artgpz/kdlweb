import { defineConfig } from "@playwright/test";

export default defineConfig({
	webServer: { command: "pnpm run dev", port: 8080, reuseExistingServer: true },
	testMatch: "**/*.e2e.{ts,js}",
});

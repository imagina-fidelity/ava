// Local review only: DEV_BYPASS_AUTH=1 in .env.local skips the portal sign-in and the databases.
// Inert in production builds whatever the env says.
export const DEV_BYPASS = process.env.NODE_ENV !== "production" && process.env.DEV_BYPASS_AUTH === "1";

export const DEV_VIEWER_EMAIL = "dev@imagina.au";

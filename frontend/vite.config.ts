import { defineConfig } from "vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  build: {
    sourcemap: true, // Source map generation must be turned on
  },
  plugins: [// Put the Sentry vite plugin after all other plugins
    sentryVitePlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: "nithish-p1",
      project: "wd401-react",
    }), sentryVitePlugin({
      org: "nithish-p1",
      project: "wd401-react"
    }),
    VitePWA({
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Appointments Management Application",
        short_name: "EventEase",
        icons: [
          {
            src: "/favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "/favicon-16x16.png",
            type: "image/png",
            sizes: "16x16",
          },
          {
            src: "/favicon-32x32.png",
            type: "image/png",
            sizes: "32x32",
          },
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/pwa-192x192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "/pwa-512x512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "any maskable",
          },
        ],
        theme_color: "#AAF",
      },
    }),
  ],
});
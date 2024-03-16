import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "./i18n";
import * as Sentry from "@sentry/react";
// import { createRoot } from "react-dom/client";
import { createRoutesFromChildren, matchRoutes, useLocation, useNavigationType } from "react-router-dom";

Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  integrations: [
    // See docs for support of different versions of variation of react router
    // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes
    }),
    Sentry.replayIntegration()
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  tracesSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

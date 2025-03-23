import * as Sentry from "@sentry/remix";

Sentry.init({
  dsn: "https://868320658c26494252e9a6709e8e0ba7@o4504952660951040.ingest.us.sentry.io/4509022795464704",
  tracesSampleRate: 1,
});

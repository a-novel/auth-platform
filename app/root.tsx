import { FC } from "react";

import { cssBundleHref } from "@remix-run/css-bundle";
import { LinksFunction } from "@remix-run/node";
import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => [{ title: "Compte Agora" }];

export const links: LinksFunction = () => [
  { rel: "icon", href: "/icon.png", type: "image/png" },
  { rel: "stylesheet", href: "/fonts/tex-gyre-heros/stylesheet.css" },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

const App: FC = () => {
  return null;
};

export default App;

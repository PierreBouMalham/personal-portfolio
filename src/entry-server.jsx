// Build-time only: renders the page to static HTML so crawlers and link
// previews that don't run JavaScript still see the full content.
import { renderToString } from "react-dom/server";
import App from "./App.jsx";

export function render() {
  return renderToString(<App />);
}

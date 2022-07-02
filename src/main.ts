import App from "./App.svelte";
import { APP_PREFIX } from "./constants";

let target: Element | null = null;

if (import.meta.env.MODE === "development") {
  target = document.getElementById("app");
} else {
  const productionTarget = document.createElement("div");
  productionTarget.id = APP_PREFIX;
  document.body.appendChild(productionTarget);
  target = productionTarget;
}

const app = new App({
  target,
});

export default app;

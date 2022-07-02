import { Engine } from "../types";

declare global {
  interface Window {
    Engine: Engine;
  }
}

export {};

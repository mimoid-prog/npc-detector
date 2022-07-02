// ==UserScript==
// @name         Margonem NPC Detector
// @version      1.0.0
// @description  Wykrywacz NPC do Margonemm
// @author       Vlk Romanov aka Rzyrkunka
// @updateURL    https://rzyrkunka.pl/npc-detector/index.user.js
// @match        http://*.margonem.pl/
// @match        https://*.margonem.pl/
// @match        http://*.margonem.com/
// @match        https://*.margonem.com/
// @run-at       document-body
// ==/UserScript==

(function () {
  setTimeout(() => {
    const jsSrc = "https://rzyrkunka.pl/npc-detector/index2.js";

    const script = document.createElement("script");
    script.src = jsSrc;

    const cssSrc = "https://rzyrkunka.pl/npc-detector/index.css";

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cssSrc;
    link.type = "text/css";

    document.head.appendChild(link);
    document.body.appendChild(script);
  }, 2000);
})();

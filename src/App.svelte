<script lang="ts">
  import Modal from "./lib/Modal/Modal.svelte";
  import DetectionAlert from "./lib/DetectionAlert/DetectionAlert.svelte";
  import type { Map, Npc } from "./types";
  import { APP_PREFIX, TRACKED_NPCS_KEY } from "./constants";

  const isDevelopment = import.meta.env.MODE === "development";

  let staticMap = "Eder";

  let isConfigModalOpen = false;
  let isDetectionAlertOpen = false;

  let foundTrackedNpc = "";
  let previousMap = "";

  const trackedNpcsRaw = localStorage.getItem(TRACKED_NPCS_KEY);
  let trackedNpcs: string[] = trackedNpcsRaw ? JSON.parse(trackedNpcsRaw) : [];

  if (!isDevelopment) {
    const topRightMenu = document.querySelector(
      ".top-right"
    ) as HTMLDivElement | null;
    if (!topRightMenu) throw new Error("Couldn't find top-right menu");
    const emptySlot = topRightMenu.querySelector(
      ".empty-slot-widget"
    ) as HTMLDivElement | null;
    if (emptySlot) {
      emptySlot.remove();
      console.log("removed empty slot");
    }

    const openBtn = document.createElement("div");
    openBtn.id = `${APP_PREFIX}-open-btn`;
    openBtn.className =
      "widget-button green widget-in-interface-bar widget-puzzle ui-draggable ui-draggable-handle";
    topRightMenu.appendChild(openBtn);

    openBtn.addEventListener("click", () => {
      isConfigModalOpen = true;
    });
  }

  function openConfigModal() {
    isConfigModalOpen = true;
  }

  function closeConfigModal() {
    isConfigModalOpen = false;
  }

  function openDetectionAlert(name: string) {
    isDetectionAlertOpen = true;
  }

  function closeDetectionAlert() {
    isDetectionAlertOpen = false;
  }

  function addNpc(name: string) {
    const newTrackedNpcs = [...trackedNpcs, name];
    localStorage.setItem(TRACKED_NPCS_KEY, JSON.stringify(newTrackedNpcs));
    trackedNpcs = newTrackedNpcs;
    previousMap = "";
  }

  function deleteTrackedNpc(name: string) {
    const newTrackedNpcs = trackedNpcs.filter((npc) => npc !== name);
    localStorage.setItem(TRACKED_NPCS_KEY, JSON.stringify(newTrackedNpcs));
    trackedNpcs = newTrackedNpcs;
  }

  function changeMap() {
    staticMap = `${staticMap}${Math.random()}`;
  }

  function getMap(): Map {
    if (import.meta.env.MODE === "development") {
      return { d: { name: staticMap } };
    } else {
      return window.Engine.map;
    }
  }

  function getNpcs(): Npc[] {
    if (import.meta.env.MODE === "development") {
      return [{ d: { nick: "Amigo" } }];
    } else {
      return Object.values(window.Engine.npcs.check());
    }
  }

  function checkForTrackedNpcs() {
    const npcs = getNpcs();
    const npc = npcs.find(
      (npc) =>
        trackedNpcs.findIndex((name) =>
          npc.d.nick.toLocaleLowerCase().includes(name.toLocaleLowerCase())
        ) !== -1
    );

    if (npc && !isDetectionAlertOpen) {
      foundTrackedNpc = npc.d.nick;
      openDetectionAlert(npc.d.nick);
    }
  }

  setInterval(() => {
    const map = getMap().d.name;
    if (previousMap !== map) {
      previousMap = map;
      checkForTrackedNpcs();
    }
  }, 1000);
</script>

<div>
  {#if isDevelopment}
    <button on:click={openConfigModal}>Open modal</button>
    <button on:click={changeMap}>Change map</button>
  {/if}
  {#if isConfigModalOpen}
    <Modal
      {trackedNpcs}
      onClose={closeConfigModal}
      onAdd={addNpc}
      onDelete={deleteTrackedNpc}
    />
  {/if}
  {#if isDetectionAlertOpen}
    <DetectionAlert name={foundTrackedNpc} onClose={closeDetectionAlert} />
  {/if}
</div>

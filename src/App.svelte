<script lang="ts">
  import Modal from "./lib/Modal/Modal.svelte";
  import DetectionAlert from "./lib/DetectionAlert/DetectionAlert.svelte";
  import type { Map, Npc } from "./types";
  import { TRACKED_NPCS_KEY } from "./constants";
  import DevelopmentBar from "./lib/DevelopmentBar/DevelopmentBar.svelte";
  import { openBtnStyle } from "./lib/OpenBtn/OpenBtn.css";
  import OpenBtn from "./lib/OpenBtn/OpenBtn.svelte";

  const isDevelopment = import.meta.env.MODE === "development";

  const mapsData: {
    [k: string]: string[];
  } = {
    Ithan: ["Jarek", "Makatara"],
    Tristam: ["Czarująca Atalia"],
    Eder: [],
  };

  let map = "";

  let isConfigModalOpen = false;
  let detectionAlerts: string[] = [];

  let previousMap = "";

  const trackedNpcsRaw = localStorage.getItem(TRACKED_NPCS_KEY);
  let trackedNpcs: string[] = trackedNpcsRaw ? JSON.parse(trackedNpcsRaw) : [];

  if (!isDevelopment) {
    // const topRightMenu = document.querySelector(
    //   ".top-right"
    // ) as HTMLDivElement | null;
    // if (!topRightMenu) throw new Error("Couldn't find top-right menu");
    // const emptySlot = topRightMenu.querySelector(
    //   ".empty-slot-widget"
    // ) as HTMLDivElement | null;
    // if (emptySlot) {
    //   emptySlot.remove();
    //   console.log("removed empty slot");
    // }

    // const openBtn = document.createElement("div");
    // openBtn.id = `${APP_PREFIX}-open-btn`;
    // openBtn.className =
    //   "widget-button green widget-in-interface-bar widget-puzzle ui-draggable ui-draggable-handle";
    // topRightMenu.appendChild(openBtn);

    const openBtn = document.createElement("div");
    openBtn.textContent = "NPC DETECTOR";
    openBtn.className = openBtnStyle;

    openBtn.addEventListener("click", () => {
      isConfigModalOpen = true;
    });

    document.body.appendChild(openBtn);
  }

  function openConfigModal() {
    isConfigModalOpen = true;
  }

  function closeConfigModal() {
    isConfigModalOpen = false;
  }

  function openDetectionAlert(name: string) {
    detectionAlerts = [...detectionAlerts, name];
  }

  function closeDetectionAlert(name: string) {
    detectionAlerts = detectionAlerts.filter((n) => n !== name);
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

  function getMap(): Map {
    if (import.meta.env.MODE === "development") {
      return { d: { name: map } };
    } else {
      return window.Engine.map;
    }
  }

  function getNpcs(): Npc[] {
    if (import.meta.env.MODE === "development") {
      const mapData = mapsData[map];

      return mapData.map((npc) => ({ d: { nick: npc } }));
    } else {
      return Object.values(window.Engine.npcs.check());
    }
  }

  function checkForTrackedNpcs() {
    const npcs = getNpcs();

    trackedNpcs.forEach((trackedNpc) => {
      const npcNicks = npcs.map((npc) => npc.d.nick);
      if (npcNicks.includes(trackedNpc)) {
        openDetectionAlert(trackedNpc);
      }
    });
  }

  setInterval(() => {
    // console.log(map);
    const currentMap = isDevelopment ? map : getMap().d.name;

    if (previousMap !== currentMap) {
      previousMap = currentMap;
      checkForTrackedNpcs();
    }
  }, 500);
</script>

<div>
  <OpenBtn onClick={openConfigModal} />
  {#if isDevelopment}
    <DevelopmentBar
      bind:map
      maps={Object.keys(mapsData)}
      onModalOpen={openConfigModal}
    />
  {/if}
  {#if isConfigModalOpen}
    <Modal
      {trackedNpcs}
      onClose={closeConfigModal}
      onAdd={addNpc}
      onDelete={deleteTrackedNpc}
    />
  {/if}
  {#each detectionAlerts as npc}
    <DetectionAlert name={npc} onClose={() => closeDetectionAlert(npc)} />
  {/each}
</div>

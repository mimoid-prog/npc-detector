<script lang="ts">
  import * as styles from "./DetectionAlert.css";

  export let name: string;
  export let onClose: () => void;

  const randomInt = (max, min) => Math.round(Math.random() * (max - min)) + min;

  const top = randomInt(40, 60);
  const left = randomInt(40, 60);
</script>

<div class={styles.detectionAlertStyle} style="top: {top}%; left: {left}%;">
  <button on:click={onClose}>Zamknij</button>
  <h4>Wykryto NPC!</h4>
  <h2>{name}</h2>
</div>

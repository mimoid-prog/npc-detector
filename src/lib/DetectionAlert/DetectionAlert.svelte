<script lang="ts">
  import * as styles from "./DetectionAlert.css";

  export let name: string;
  export let onClose: () => void;
</script>

<div class={styles.detectionAlertStyle}>
  <button on:click={onClose}>Zamknij</button>
  <h4>Wykryto NPC!</h4>
  <h2>{name}</h2>
</div>

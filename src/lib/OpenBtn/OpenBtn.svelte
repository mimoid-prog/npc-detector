<script lang="ts">
  import * as styles from "./OpenBtn.css";

  export let onClick: () => void;
</script>

<button class={styles.openBtnStyle} on:click={onClick}>NPC DETECTOR</button>

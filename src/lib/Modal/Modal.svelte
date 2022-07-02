<script lang="ts">
  import * as styles from "./Modal.css";

  export let trackedNpcs: string[];
  export let onClose: () => void;
  export let onAdd: (name: string) => void;
  export let onDelete: (name: string) => void;

  let name = "";

  function handleAdd() {
    onAdd(name);
    name = "";
  }
</script>

<div class={styles.modal}>
  <button on:click={onClose}>Zamknij</button>
  <label class={styles.label} for="npc-name"
    >Podaj nazwę npc, którego chcesz wykrywać:</label
  >
  <input bind:value={name} name="npc-name" type="text" />
  <button on:click={handleAdd}>Dodaj</button>
  <ul class={styles.trackedNpcList}>
    {#each trackedNpcs as npc}
      <li class={styles.trackedNpcItem}>
        <span>{npc}</span>
        <button on:click={() => onDelete(npc)}>Usuń</button>
      </li>
    {/each}
  </ul>
</div>

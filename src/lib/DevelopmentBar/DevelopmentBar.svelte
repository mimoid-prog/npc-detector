<script lang="ts">
  export let map: string;
  export let maps: string[];
  export let onModalOpen: () => void;
</script>

<div>
  <div>
    <button on:click={onModalOpen}>Open modal</button>
  </div>
  <div>
    <p>
      Current map: {#if map === ""} no map {:else} {map} {/if}
    </p>
    <select bind:value={map}>
      {#each maps as m}
        <option value={m}>
          {m}
        </option>
      {/each}
    </select>
  </div>
</div>

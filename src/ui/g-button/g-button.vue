<script setup lang="ts">
import { GSquircle } from '../g-shape'
</script>

<template>
  <button
    class="g-button-vars g-button shrink-0 min-w-8 min-h-8 p-1 relative text-xs text-#FFF flex gap-1 flex-col items-center justify-end select-none"
  >
    <GSquircle fill="var(--bg)" />
    <div
      class="w-6 h-6 text-[10px] aspect-ratio-square bg-gray rounded-full grid place-content-center"
    >
      ico
    </div>
    <slot />
  </button>
</template>

<style scoped>
.g-button-vars {
  --bg: transparent;
  --bg-hover: #ffffff20;
  --bg-active: #ffffff10;
}

.is-actived .g-button-vars {
  --bg: #00000040;
  --bg-hover: #00000040;
  --bg-active: #00000040;
}

.g-button {
  cursor: pointer;
}

.g-button:hover {
  --bg: var(--bg-hover);
}
.g-button:active {
  --bg: var(--bg-active);
}
</style>

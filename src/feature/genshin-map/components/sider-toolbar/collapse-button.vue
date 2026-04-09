<script setup lang="ts">
const collapsed = defineModel<boolean>('collapsed')
</script>

<template>
  <div class="w-16 h-16 p-2 absolute left-0 top-0 z-10">
    <svg
      viewBox="-200 -200 1400 1400"
      xmlns="http://www.w3.org/2000/svg"
      :class="[
        'collapse-button collapse-button-vars',
        'rounded-full p-1 cursor-pointer relative',
        collapsed ? 'is-collapsed' : '',
      ]"
      fill="none"
      @click="collapsed = !collapsed"
    >
      <defs>
        <path
          id="path"
          d="M500,0 L580,320 L500,450 L420,320 Z"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
          class="translate-y-[var(--zip-width)]"
        />
      </defs>
      <g class="origin-[500px_500px] rotate-[var(--rotate)]" stroke="currentColor">
        <use href="#path" transform-origin="500 500" transform="rotate(-45)" />
        <use href="#path" transform-origin="500 500" transform="rotate(+45)" />
        <use href="#path" transform-origin="500 500" transform="rotate(135)" />
        <use href="#path" transform-origin="500 500" transform="rotate(225)" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
@property --zip-width {
  syntax: '<percentage>';
  inherits: true;
  initial-value: 0%;
}

@property --rotate {
  syntax: '<angle>';
  inherits: true;
  initial-value: 0deg;
}

.collapse-button-vars {
  --zip-width: -5%;
  --zip-active-width: -10%;
  --rotate: 0deg;
  --bg-hover: hsl(0, 0%, 92%);
  --bg-active: hsl(0, 0%, 88%);
  --light-hover: transparent;
}

.collapse-button {
  transition:
    --zip-width 150ms ease,
    --rotate 150ms ease;
}
.collapse-button:hover {
  background-color: var(--bg-hover);
  filter: drop-shadow(0 0 1px var(--light-hover)) drop-shadow(0 0 8px var(--light-hover));
}
.collapse-button:active {
  --zip-width: var(--zip-active-width);
  background-color: var(--bg-active);
  filter: drop-shadow(0 0 1px var(--light-hover));
}
.collapse-button.is-collapsed {
  --light-hover: hsl(0, 0%, 100%);
  --bg-hover: transparent;
  --bg-active: transparent;
  --zip-width: 0%;
  --zip-active-width: -5%;
  --rotate: 45deg;
}
</style>

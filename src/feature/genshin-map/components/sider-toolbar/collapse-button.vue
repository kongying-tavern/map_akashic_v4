<script setup lang="ts">
const collapsed = defineModel<boolean>('collapsed')

const id = useId()
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
          :id="`path-${id}`"
          d="M500,0 L580,320 L500,450 L420,320 Z"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
          class="translate-y-[var(--zip-width)]"
        />
        <clipPath :id="`clip-path-${id}`" class="origin-c scale-[var(--progress)]">
          <rect x="0" y="0" width="1000" height="1000" fill="white" />
        </clipPath>
        <g :id="`g-${id}`" class="origin-[500px_500px] rotate-[var(--rotate)]">
          <use :href="`#path-${id}`" transform-origin="500 500" transform="rotate(-45)" />
          <use :href="`#path-${id}`" transform-origin="500 500" transform="rotate(+45)" />
          <use :href="`#path-${id}`" transform-origin="500 500" transform="rotate(135)" />
          <use :href="`#path-${id}`" transform-origin="500 500" transform="rotate(225)" />
        </g>
      </defs>
      <use :href="`#g-${id}`" stroke="currentColor" />
      <use
        :href="`#g-${id}`"
        fill="#FFFFFFA0"
        stroke="white"
        :clip-path="`url(#clip-path-${id})`"
      />
    </svg>
  </div>
</template>

<style scoped>
@property --progress {
  syntax: '<percentage>';
  inherits: true;
  initial-value: 0%;
}

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
  --bg-hover: light-dark(hsl(0, 0%, 92%), hsl(0, 0%, 30%));
  --bg-active: light-dark(hsl(0, 0%, 88%), hsl(0, 0%, 20%));
  --light-hover: transparent;
  --progress: 0%;
}

.collapse-button {
  transition:
    --zip-width 150ms ease,
    --rotate 300ms cubic-bezier(0.34, 1.56, 0.64, 1),
    --progress 150ms ease;
}
.collapse-button:hover {
  background-color: var(--bg-hover);
  filter: drop-shadow(0 0 12px light-dark(#ffffff, #000000));
}
.collapse-button:active {
  --zip-width: var(--zip-active-width);
  background-color: var(--bg-active);
  filter: drop-shadow(0 0 2px light-dark(#ffffff, #000000));
}
.collapse-button.is-collapsed {
  --light-hover: light-dark(hsl(0, 0%, 100%), hsl(0, 0%, 0%));
  --bg-hover: transparent;
  --bg-active: transparent;
  --zip-width: 0%;
  --zip-active-width: -5%;
  --rotate: 45deg;
  --progress: 100%;
}
.collapse-button.is-collapsed:active {
  --rotate: 50deg;
}
</style>

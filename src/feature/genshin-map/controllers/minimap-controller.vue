<script setup lang="ts">
// 123
</script>

<template>
  <div
    :class="[
      'absolute top-2 left-2 w-32 h-32 rounded-32 border border-#FFFFFF40',
      'grid place-content-center',
      'text-white bg-[hsl(228,17%,30%)]',
      'pointer-events-auto select-none',
    ]"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M50,5 L95,95 L50,70 L5,95 Z"
        fill="hsl(201, 98%, 40%)"
        stroke="hsl(201, 98%, 70%)"
        stroke-linecap="round"
        stroke-width="6"
      />
    </svg>
  </div>
</template>

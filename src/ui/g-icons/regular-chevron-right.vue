<script setup lang="ts">
defineProps<{
  nonScalingStroke?: boolean
}>()
</script>

<template>
  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
    <polyline
      points="5,3 11,8 5,13"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

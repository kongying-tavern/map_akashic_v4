<script setup lang="ts">
defineProps<{
  nonScalingStroke?: boolean
}>()
</script>

<template>
  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <line
      x1="3"
      y1="3"
      x2="13"
      y2="13"
      stroke="currentColor"
      stroke-width="1"
      :vector-effect="nonScalingStroke ? 'non-scaling-stroke' : undefined"
    />
    <line
      x1="13"
      y1="3"
      x2="3"
      y2="13"
      stroke="currentColor"
      stroke-width="1"
      :vector-effect="nonScalingStroke ? 'non-scaling-stroke' : undefined"
    />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{
  src?: string
}>()

const loading = ref(Boolean(props.src?.trim()))
const error = ref(false)
</script>

<template>
  <div class="overflow-hidden flex" style="container-type: size">
    <img
      v-show="src?.trim() && !loading && !error"
      :draggable="false"
      :src="props.src"
      class="flex-1 object-cover"
      @load="loading = false"
      @error="error = true"
    />
  </div>
</template>

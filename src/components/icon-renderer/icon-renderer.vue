<script lang="ts">
import type { ClassValue } from 'vue'
export interface IconRendererProps {
  /** 图标 id */
  iconId?: number
  classes?: {
    root?: ClassValue
    img?: ClassValue
  }
}
</script>

<script setup lang="ts">
import { useIcon } from '@/hooks/use-icon'

const props = defineProps<IconRendererProps>()

const { url: imageUrl } = useIcon(toRef(props, 'iconId'))

const enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success',
}

const status = ref(Status.IDLE)

watch(
  () => imageUrl.value,
  (url) => {
    if (!url) {
      status.value = Status.IDLE
      return
    }
    status.value = Status.LOADING
  },
  { immediate: true },
)
</script>

<template>
  <div class="inline align-middle leading-0 text-0" :class="classes?.root">
    <slot v-if="status === Status.IDLE" name="empty">
      <div>No Image</div>
    </slot>

    <img
      v-if="[Status.LOADING, Status.SUCCESS].includes(status)"
      v-show="status === Status.SUCCESS"
      :src="imageUrl"
      class="block w-full h-auto"
      :class="classes?.img"
      @load="status = Status.SUCCESS"
      @error="status = Status.ERROR"
    />

    <slot v-if="status === Status.LOADING" name="loading">
      <div>Loading</div>
    </slot>

    <slot v-if="status === Status.ERROR" name="error">
      <div>Error</div>
    </slot>
  </div>
</template>

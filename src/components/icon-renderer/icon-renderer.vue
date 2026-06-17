<script lang="ts">
import type { ClassValue } from 'vue'
export interface IconRendererProps {
  /** 图标 id */
  iconId?: number
  disabledCache?: boolean
  classes?: {
    root?: ClassValue
    img?: ClassValue
  }
}
</script>

<script setup lang="ts">
import Api from '@/api'
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
const cachedUrl = ref<string>()

let abortController: AbortController | null = null

const revokeUrl = () => {
  if (cachedUrl.value) {
    URL.revokeObjectURL(cachedUrl.value)
    cachedUrl.value = undefined
  }
}

const loadAsset = async (url: string) => {
  console.log('loadAsset')
  // 取消之前的请求
  abortController?.abort()
  abortController = new AbortController()

  // 清理之前的 Object URL
  revokeUrl()

  status.value = Status.LOADING

  try {
    const blob = await Api.assets.getCacheableAsset(url, abortController.signal)
    abortController.signal.throwIfAborted()

    cachedUrl.value = URL.createObjectURL(blob)
    status.value = Status.SUCCESS
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') return
    status.value = Status.ERROR
  }
}

watch(
  () => imageUrl.value,
  (url) => {
    if (!url) {
      abortController?.abort()
      revokeUrl()
      status.value = Status.IDLE
      return
    }
    loadAsset(url)
  },
  { immediate: true },
)

onUnmounted(() => {
  abortController?.abort()
  revokeUrl()
})
</script>

<template>
  <div :class="classes?.root">
    <slot v-if="status === Status.IDLE" name="empty">
      <div class="whitespace-nowrap text-xs grid place-content-center h-full">-</div>
    </slot>

    <img
      v-if="cachedUrl"
      v-show="status === Status.SUCCESS"
      :src="cachedUrl"
      class="block"
      :class="classes?.img"
      @load="status = Status.SUCCESS"
      @error="status = Status.ERROR"
    />

    <slot v-if="status === Status.LOADING" name="loading">
      <div class="animate-pulse bg-[--gl-2] rounded w-full h-full"></div>
    </slot>

    <slot v-if="status === Status.ERROR" name="error">
      <div>Error</div>
    </slot>
  </div>
</template>

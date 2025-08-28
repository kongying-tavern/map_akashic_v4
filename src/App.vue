<script setup lang="ts">
import { useRequest } from 'alova/client'

const { onSuccess } = useRequest(Apis.role.listRole({
  transform: data => data.data ?? [],
}))

onSuccess((...args) => {
  console.warn('list-role', { args })
})
</script>

<template>
  <div class="w-full h-full grid place-items-center">
    Create App
  </div>
</template>

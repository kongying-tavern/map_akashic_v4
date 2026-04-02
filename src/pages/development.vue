<script setup lang="ts">
import GSquircle from '@/ui/g-shape/g-squircle.vue'

const handleClick = async () => {
  const res = await fetch('/dev-api/oauth/token?scope=all&grant_type=client_credentials', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${window.btoa('webcommon:genshinstart')}`,
    },
    body: JSON.stringify({
      grant_type: 'password',
      username: 'admin',
      password: '123456',
    }),
  })
  const data = await res.json()
  console.log('handleClick', data)
}
</script>

<template>
  <div class="h-full p-2 bg-gray-100">
    <GSquircle
      class="cursor-pointer select-none grid place-content-center text-#666666"
      :w="128"
      :h="32"
      :stroke-width="1"
      stroke="#e0c89b"
      fill="#f2e8d5"
      :n="5"
      :samples="16"
      @click="handleClick"
    >
      登录
    </GSquircle>
    <div
      class="w-128px h-32px border border-#e0c89b bg-#f2e8d5 mt-2 text-#666666 rounded-lg grid place-content-center"
    >
      登录
    </div>
  </div>
</template>

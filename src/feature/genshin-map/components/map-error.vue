<script setup lang="ts">
defineProps<{
  message?: string
}>()

const emit = defineEmits<{
  retry: []
}>()
</script>

<template>
  <div class="map-error">
    <div class="error-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4m0 4h.01" stroke-linecap="round" />
      </svg>
    </div>
    <div class="error-content">
      <h3 class="error-title">配置加载失败</h3>
      <p class="error-desc">{{ message || '无法获取地图配置，请检查网络连接后重试' }}</p>
    </div>
    <button class="retry-btn" @click="emit('retry')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M1 4v6h6M23 20v-6h-6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <span>重新加载</span>
    </button>
  </div>
</template>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.map-error {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: light-dark(oklch(0.98 0 0), oklch(0.18 0.01 255.6));
  z-index: 50;
  animation: fade-in-up 0.4s ease-out;
}

.error-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: light-dark(oklch(0.95 0.04 25), oklch(0.3 0.06 25));
  display: grid;
  place-content: center;
  padding: 14px;
  color: light-dark(oklch(0.6 0.15 25), oklch(0.75 0.12 25));
}

.error-icon svg {
  width: 100%;
  height: 100%;
}

.error-content {
  text-align: center;
}

.error-title {
  font-size: 16px;
  font-weight: 600;
  color: light-dark(oklch(0.25 0.01 255), oklch(0.9 0 0));
  margin-bottom: 8px;
}

.error-desc {
  font-size: 13px;
  color: light-dark(oklch(0.5 0.01 248), oklch(0.6 0.01 248));
  max-width: 280px;
  line-height: 1.5;
}

.retry-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background: light-dark(oklch(0.25 0.01 255), oklch(0.4 0.01 255));
  color: light-dark(oklch(0.98 0 0), oklch(0.95 0 0));
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 4px;
}

.retry-btn svg {
  width: 16px;
  height: 16px;
}

.retry-btn:hover {
  background: light-dark(oklch(0.35 0.01 255), oklch(0.5 0.01 255));
  transform: translateY(-1px);
  box-shadow: 0 4px 12px oklch(0 0 0 / 0.15);
}

.retry-btn:active {
  transform: translateY(0);
  box-shadow: none;
}
</style>

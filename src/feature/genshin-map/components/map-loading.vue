<script setup lang="ts">
const icons = [
  { src: '/icons/pyro.svg', alt: 'Pyro' },
  { src: '/icons/hydro.svg', alt: 'Hydro' },
  { src: '/icons/anemo.svg', alt: 'Anemo' },
  { src: '/icons/electro.svg', alt: 'Electro' },
  { src: '/icons/dendro.svg', alt: 'Dendro' },
  { src: '/icons/cryo.svg', alt: 'Cryo' },
  { src: '/icons/geo.svg', alt: 'Geo' },
]
</script>

<template>
  <div class="map-loading">
    <div class="loading-icons">
      <img
        v-for="(icon, index) in icons"
        :key="icon.alt"
        :src="icon.src"
        :alt="icon.alt"
        class="loading-icon"
        :style="{ animationDelay: `${index * 0.12}s` }"
      />
    </div>
    <p class="loading-text">正在加载地图配置...</p>
  </div>
</template>

<style scoped>
@keyframes icon-pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.85);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes text-shimmer {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.map-loading {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  background: light-dark(oklch(0.98 0 0), oklch(0.18 0.01 255.6));
  z-index: 50;
}

.loading-icons {
  display: flex;
  align-items: center;
  gap: 12px;
}

.loading-icon {
  width: 32px;
  height: 32px;
  animation: icon-pulse 1.4s ease-in-out infinite;
  filter: drop-shadow(0 2px 8px oklch(0.6 0.15 50 / 0.3));
}

.loading-text {
  font-size: 14px;
  color: light-dark(oklch(0.5 0.01 248), oklch(0.65 0.01 248));
  animation: text-shimmer 1.8s ease-in-out infinite;
  letter-spacing: 0.5px;
}
</style>

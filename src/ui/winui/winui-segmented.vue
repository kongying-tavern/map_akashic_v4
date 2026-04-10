<script setup lang="ts">
export interface WinuiSegmentedOption {
  label: string
  value: string
}

const props = withDefaults(
  defineProps<{
    modelValue: string
    options: WinuiSegmentedOption[]
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const onSelect = (value: string) => {
  if (props.disabled) return
  if (value === props.modelValue) return
  emit('update:modelValue', value)
  emit('change', value)
}

const onKeydown = (e: KeyboardEvent) => {
  if (props.disabled) return
  const key = e.key
  if (key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Home' && key !== 'End') return
  if (!props.options.length) return

  e.preventDefault()
  const currentIndex = Math.max(
    0,
    props.options.findIndex((o) => o.value === props.modelValue),
  )

  let nextIndex = currentIndex
  if (key === 'ArrowLeft') nextIndex = Math.max(0, currentIndex - 1)
  else if (key === 'ArrowRight') nextIndex = Math.min(props.options.length - 1, currentIndex + 1)
  else if (key === 'Home') nextIndex = 0
  else if (key === 'End') nextIndex = props.options.length - 1

  onSelect(props.options[nextIndex].value)
}
</script>

<template>
  <div
    class="winui-segmented"
    role="radiogroup"
    :aria-disabled="disabled ? 'true' : 'false'"
    @keydown="onKeydown"
  >
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      class="winui-segmented__item"
      role="radio"
      :aria-checked="opt.value === modelValue ? 'true' : 'false'"
      :data-checked="opt.value === modelValue ? 'true' : 'false'"
      :disabled="disabled"
      @click="() => onSelect(opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>

<style scoped>
/* ============================== winui components ============================== */
.winui-segmented {
  --winui-segmented-radius: 8px;
  /* 使用 src/styles/theme.css 的灰阶与主题色 */
  --winui-segmented-bg: var(--gl-2);
  --winui-segmented-border: var(--gl-4);
  --winui-segmented-item-hover: var(--gl-3);
  --winui-segmented-item-pressed: var(--gl-4);
  --winui-segmented-item-checked: var(--color-brand-2);
  --winui-segmented-focus: var(--color-brand-6);

  display: inline-grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 2px;
  padding: 2px;
  border-radius: var(--winui-segmented-radius);
  border: 1px solid var(--winui-segmented-border);
  background: var(--winui-segmented-bg);
  user-select: none;
}

.winui-segmented__item {
  appearance: none;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: 1;
  border-radius: calc(var(--winui-segmented-radius) - 2px);
  padding: 8px 10px;
  min-width: 3.5rem;
  cursor: pointer;
  transition:
    background-color 120ms ease,
    transform 80ms ease;
}

.winui-segmented__item:hover {
  background: var(--winui-segmented-item-hover);
}

.winui-segmented__item:active {
  background: var(--winui-segmented-item-pressed);
  transform: translateY(0.5px);
}

.winui-segmented__item[data-checked='true'] {
  background: var(--winui-segmented-item-checked);
}

.winui-segmented__item:focus-visible {
  outline: 2px solid var(--winui-segmented-focus);
  outline-offset: 1px;
}

.winui-segmented[aria-disabled='true'] {
  opacity: 0.6;
}

.winui-segmented__item:disabled {
  cursor: not-allowed;
}
</style>

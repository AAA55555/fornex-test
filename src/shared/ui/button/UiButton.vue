<script setup>
const props = defineProps({
  as: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary',
    validator(value) {
      return ['primary'].includes(value)
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <component
    :is="props.as"
    :class="props.variant"
    class="rounded-md px-2.5 py-1.5 disabled:opacity-70"
  >
    <slot />
  </component>
</template>

<style lang="css" scoped>
.primary {
  @apply bg-blue-500 text-white transition-opacity hover:opacity-75;
}
</style>

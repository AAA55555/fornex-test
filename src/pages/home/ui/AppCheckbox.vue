<script setup>
import { UiInput } from '@/shared/ui/inputs'

const model = defineModel()
</script>

<template>
  <label class="flex w-max cursor-pointer items-center gap-x-3">
    <UiInput type="checkbox" v-model="model" class="w-max" />
    <slot />
  </label>
</template>

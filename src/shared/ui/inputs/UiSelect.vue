<script setup>
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
})

const model = defineModel()
</script>

<template>
  <select v-model="model" class="w-full border border-none bg-transparent px-1 outline-none">
    <option v-for="option in props.options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

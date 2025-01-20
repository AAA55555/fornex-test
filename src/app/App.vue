<script setup>
import './styles'

import { useRoute } from 'vue-router'
import { TheHeader } from '@/widgets/header'
import { DefaultLayout } from '@/shared/ui/layouts'
import { computed } from 'vue'

const route = useRoute()

const layout = computed(() => route.meta.layout || DefaultLayout)
</script>

<template>
  <component :is="layout">
    <template v-slot:header>
      <TheHeader />
    </template>

    <template v-slot:default>
      <router-view />
    </template>
  </component>
</template>

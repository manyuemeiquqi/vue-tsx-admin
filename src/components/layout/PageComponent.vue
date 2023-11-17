<template>
  <RouterView v-slot="{ Component, route }">
    <Transition>
      <component :is="Component" v-if="route.meta.ignoreCache" />
      <KeepAlive v-else>
        <component :is="Component" />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style lang="scss" scoped></style>

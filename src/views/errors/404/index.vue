<template>
  <ErrorCard status="404" subtitle="抱歉，页面不见了～">
    <template #extra>
      <AButton> 返回</AButton>
    </template>
  </ErrorCard>
</template>

<script lang="ts" setup>
import ErrorCard from '@/components/error-card/ErrorCard.vue'
</script>

<style lang="scss" scoped></style>

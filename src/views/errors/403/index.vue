<template>
  <ErrorCard status="403" subtitle="对不起，您没有访问该资源的权限">
    <template #extra>
      <AButton> 返回</AButton>
    </template>
  </ErrorCard>
</template>

<script lang="ts" setup>
import ErrorCard from '@/components/error-card/ErrorCard.vue'
</script>

<style lang="scss" scoped></style>

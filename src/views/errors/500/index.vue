<template>
  <ErrorCard subtitle="抱歉，服务器出了点问题～" status="500">
    <template #extra>
      <AButton> 返回</AButton>
    </template>
  </ErrorCard>
</template>

<script lang="ts" setup>
import ErrorCard from '@/components/error-card/ErrorCard.vue'
</script>

<style lang="scss" scoped></style>

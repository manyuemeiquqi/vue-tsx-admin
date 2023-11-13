<template>
  <ALayout class="">
    <header>header</header>
    <ALayout>
      <ALayoutSider> menu </ALayoutSider>
      <ALayout>
        <div>tab close</div>
        <ALayoutContent class="min-h-screen">
          <PageComponent />
        </ALayoutContent>
      </ALayout>
    </ALayout>
  </ALayout>
</template>

<script lang="ts" setup>
import PageComponent from '@/components/layout/page-component/PageComponent.vue'
</script>

<style lang="scss" scoped></style>

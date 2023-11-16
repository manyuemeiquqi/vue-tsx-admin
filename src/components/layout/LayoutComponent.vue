<template>
  <ALayout class="">
    <header>header</header>
    <ALayout>
      <ALayoutSider>
        <MenuComponent></MenuComponent>
      </ALayoutSider>
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
import MenuComponent from '@/components/layout/MenuComponent'
</script>

<style lang="scss" scoped></style>

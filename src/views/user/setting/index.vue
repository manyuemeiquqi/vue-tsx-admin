<template>
  <div>
    <ARow class="mb-4">
      <ACol :span="24">
        <UserPanel />
      </ACol>
    </ARow>
    <ARow>
      <ACol :span="24">
        <ATabs default-active-key="1" type="rounded">
          <ATabPane v-for="item in componentList" :key="item.key" :title="item.title">
            <component :is="item.component"></component>
          </ATabPane>
        </ATabs>
      </ACol>
    </ARow>
  </div>
</template>

<script setup lang="ts">
import BasicInformation from '@/views/user/setting/components/BasicInformation'
import SecuritySettings from '@/views/user/setting/components/SecuritySettings.vue'
import Certification from '@/views/user/setting/components/Certification.vue'
import UserPanel from '@/views/user/setting/components/UserPanel.vue'

const componentList = [
  {
    key: '1',
    component: BasicInformation,
    title: '基础信息'
  },
  {
    key: '2',
    component: SecuritySettings,
    title: '安全设置'
  },
  {
    key: '3',
    component: Certification,
    title: '实名认证'
  }
]
</script>

<style lang="scss" scoped></style>

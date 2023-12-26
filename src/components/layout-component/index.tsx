import { useAppStore, useUserStore } from '@/store'
import { AppRouteNames, layoutStyleConfig } from '@/types/constants'
import { Layout } from '@arco-design/web-vue'
import { computed, defineComponent, watch } from 'vue'
import BreadcrumbComponent from './BreadcrumbComponent'
import FooterComponent from './FooterComponent'
import MenuComponent from './MenuComponent'
import Navbar from './Navbar'
import PageComponent from './PageComponent'
import TabBar from './TabBar'
import styles from './style.module.scss'
import AppSetting from './AppSetting'
import usePermission from '@/hooks/permission'
import { useRoute, useRouter } from 'vue-router'
import type { AppRouteRecordRaw } from '@/router/routes/types'
export default defineComponent({
  name: 'LayoutComponent',
  setup() {
    const applicationStore = useAppStore()
    const paddingStyle = computed(() => {
      const paddingLeft = applicationStore.menu ? { paddingLeft: `${siderWidth.value}px` } : {}
      const paddingTop = applicationStore.navbar
        ? { paddingTop: layoutStyleConfig.NAVBAR_HEIGHT + 'px' }
        : {}

      return { ...paddingLeft, ...paddingTop }
    })
    const siderWidth = computed(() => {
      return applicationStore.menuCollapse ? 48 : applicationStore.menuWidth
    })
    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore()
    const permission = usePermission()
    watch(
      () => userStore.role,
      (roleValue) => {
        if (roleValue && !permission.routeHasPermission(route))
          router.push({ name: AppRouteNames.notFound })
      }
    )
    return () => {
      return (
        <>
          <Layout>
            {applicationStore.navbar && <Navbar />}
            <Layout>
              {applicationStore.menu && (
                <Layout.Sider
                  class={[styles.sider]}
                  style={{
                    paddingTop: paddingStyle.value.paddingTop
                  }}
                  width={siderWidth.value}
                  breakpoint="xl"
                  collapsible
                  hideTrigger
                  collapsed={applicationStore.menuCollapse}
                  onCollapse={(val) => (applicationStore.menuCollapse = val)}
                >
                  <MenuComponent></MenuComponent>
                </Layout.Sider>
              )}
              <Layout class={[styles.main]} style={paddingStyle.value}>
                <TabBar />
                <BreadcrumbComponent class={['px-5']} />
                <Layout.Content>
                  <PageComponent class={['px-5']} />
                </Layout.Content>
                <FooterComponent />
              </Layout>
            </Layout>
          </Layout>
          <AppSetting />
        </>
      )
    }
  }
})

import { Layout } from '@arco-design/web-vue'
import { computed, defineComponent } from 'vue'
import MenuComponent from './MenuComponent'
import PageComponent from './PageComponent'
import FooterComponent from './FooterComponent'
import Navbar from './Navbar'
import TabBar from './TabBar'
import BreadcrumbComponent from './BreadcrumbComponent'
import styles from './style.module.scss'
import { useApplicationStore } from '@/store'
import { layoutStyleConfig } from '@/types/constants'
export default defineComponent({
  name: 'LayoutComponent',
  setup() {
    const applicationStore = useApplicationStore()
    const paddingStyle = computed(() => {
      const paddingLeft =
        applicationStore.menu && !applicationStore.hideMenu
          ? { paddingLeft: `${siderWidth.value}px` }
          : {}
      const paddingTop = applicationStore.navbar
        ? { paddingTop: layoutStyleConfig.NAVBAR_HEIGHT + 'px' }
        : {}

      return { ...paddingLeft, ...paddingTop }
    })
    const siderWidth = computed(() => {
      return applicationStore.menuCollapse ? 48 : applicationStore.menuWidth
    })
    return () => {
      return (
        <Layout>
          <Navbar />
          <Layout>
            <Layout.Sider
              class={[styles.sider]}
              width={siderWidth.value}
              breakpoint="xl"
              collapsible
              hideTrigger
              collapsed={applicationStore.menuCollapse}
              onCollapse={(val) => (applicationStore.menuCollapse = val)}
            >
              <MenuComponent></MenuComponent>
            </Layout.Sider>
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
      )
    }
  }
})

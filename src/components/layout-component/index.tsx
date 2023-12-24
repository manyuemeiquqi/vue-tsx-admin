import { useApplicationStore } from '@/store'
import { layoutStyleConfig } from '@/types/constants'
import { Layout } from '@arco-design/web-vue'
import { computed, defineComponent } from 'vue'
import BreadcrumbComponent from './BreadcrumbComponent'
import FooterComponent from './FooterComponent'
import MenuComponent from './MenuComponent'
import Navbar from './Navbar'
import PageComponent from './PageComponent'
import TabBar from './TabBar'
import styles from './style.module.scss'
export default defineComponent({
  name: 'LayoutComponent',
  setup() {
    const applicationStore = useApplicationStore()
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
    return () => {
      return (
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
      )
    }
  }
})

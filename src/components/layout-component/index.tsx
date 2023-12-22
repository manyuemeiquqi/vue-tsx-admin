import { Layout } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import MenuComponent from './MenuComponent'
import PageComponent from './PageComponent'
import FooterComponent from './FooterComponent'
import Navbar from './Navbar'
import TabBar from './TabBar'
import BreadcrumbComponent from './BreadcrumbComponent'
import styles from './style.module.scss'
export default defineComponent({
  name: 'LayoutComponent',
  setup() {
    return () => {
      return (
        <Layout>
          <Navbar />
          <Layout>
            <Layout.Sider class={[styles.sider]}>
              <MenuComponent></MenuComponent>
            </Layout.Sider>
            <Layout class={[styles.main]}>
              <div class="pt-4 pb-0 px-5">
                <TabBar />
                <BreadcrumbComponent />
                <Layout.Content>
                  <PageComponent />
                </Layout.Content>
              </div>
              <FooterComponent />
            </Layout>
          </Layout>
        </Layout>
      )
    }
  }
})

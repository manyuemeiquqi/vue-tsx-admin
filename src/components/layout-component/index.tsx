import { Layout } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import MenuComponent from './MenuComponent'
import PageComponent from './PageComponent'
import FooterComponent from './FooterComponent'
import Navbar from './Navbar'
import TabBar from './TabBar'
import BreadcrumbComponent from './BreadcrumbComponent'
export default defineComponent({
  setup() {
    return () => {
      return (
        <Layout>
          <Navbar />
          <Layout class="!pt-16">
            <Layout.Sider>
              <MenuComponent></MenuComponent>
            </Layout.Sider>
            <Layout class="pt-16">
              <TabBar />
              <BreadcrumbComponent />
              <Layout.Content class="min-h-screen">
                <PageComponent />
              </Layout.Content>
              <FooterComponent />
            </Layout>
          </Layout>
        </Layout>
      )
    }
  }
})

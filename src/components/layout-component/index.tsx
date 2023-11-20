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
          <Layout>
            <Layout.Sider class="!pt-16   h-full !fixed left-0 ">
              <MenuComponent></MenuComponent>
            </Layout.Sider>
            <Layout class="!pt-16   !pl-52 min-h-screen bg-cyan-200">
              <TabBar />
              <BreadcrumbComponent />
              <Layout.Content class="!pt-4  !pl-5 ">
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

import { Layout } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import MenuComponent from './MenuComponent'
import PageComponent from './PageComponent'
import FooterComponent from './FooterComponent'
export default defineComponent({
  setup() {
    return () => {
      return (
        <Layout>
          <Layout.Sider>
            <MenuComponent></MenuComponent>
          </Layout.Sider>
          <Layout>
            <div>tab close</div>
            <Layout.Content class="min-h-screen">
              <PageComponent />
            </Layout.Content>
            <FooterComponent />
          </Layout>
        </Layout>
      )
    }
  }
})

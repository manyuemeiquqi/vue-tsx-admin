import { Col, Row } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import LoginForm from '@/views/login/LoginForm'
import LoginBanner from '@/views/login/LoginBanner'
export default defineComponent({
  setup() {
    return () => (
      <div class="h-screen flex">
        <div>
          <LoginBanner></LoginBanner>
        </div>
        <div>{/* <LoginForm></LoginForm> */}</div>
      </div>
    )
  }
})

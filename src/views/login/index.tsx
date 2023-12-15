import { defineComponent } from 'vue'
import LoginForm from '@/views/login/LoginForm'
import LoginBanner from '@/views/login/LoginBanner'
import { Space } from '@arco-design/web-vue'
export default defineComponent({
  setup() {
    return () => (
      <div class="h-screen flex">
        <Space align="center" class=" top-1  left-1 fixed">
          <img
            alt="logo"
            src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
          />
          <span
            style={{
              color: 'var(--color-fill-1)',
              fontSize: '22px'
            }}
          >
            Vue TSX Admin
          </span>
        </Space>
        <div
          style={{
            width: '550px',
            background: 'linear-gradient(163.85deg, #1d2129 0%, #00308f 100%)'
          }}
        >
          <LoginBanner></LoginBanner>
        </div>
        <div class="flex-1 justify-center items-center flex">
          <LoginForm></LoginForm>
        </div>
      </div>
    )
  }
})

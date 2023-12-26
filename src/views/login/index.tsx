import { defineComponent } from 'vue'
import LoginForm from '@/views/login/LoginForm'
import LoginBanner from '@/views/login/LoginBanner'
import { Space } from '@arco-design/web-vue'
import Logo from '@/assets/logo.svg'
import { ApplicationInfo, CompNameEnum } from '@/types/constants'
export default defineComponent({
  name: CompNameEnum.login,
  setup() {
    return () => (
      <div class="h-screen flex">
        <Space align="center" class={['top-1', 'left-1', 'fixed']}>
          <img src={Logo} alt="logo" class={['w-8', 'h-8']} />
          <span class={['text-2xl', 'lg:text-[var(--color-fill-1)]']}>
            {ApplicationInfo.appTitle}
          </span>
        </Space>
        <div
          style={{
            background: 'linear-gradient(163.85deg, #1d2129 0%, #00308f 100%)'
          }}
          class={['hidden', 'lg:block', 'w-[550px]']}
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

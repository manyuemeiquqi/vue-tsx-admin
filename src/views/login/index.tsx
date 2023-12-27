import { ViewNames } from '@/types/constants'
import LoginBanner from '@/views/login/LoginBanner'
import LoginForm from '@/views/login/LoginForm'
import { defineComponent } from 'vue'
export default defineComponent({
  name: ViewNames.login,
  setup() {
    return () => (
      <div class="min-h-screen flex">
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

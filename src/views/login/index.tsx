import { defineComponent } from 'vue'
import LoginForm from '@/views/login/LoginForm'
import LoginBanner from '@/views/login/LoginBanner'
export default defineComponent({
  setup() {
    return () => (
      <div class=" h-screen flex">
        <div
          class="  w-[34.375rem] 
          bg-[linear-gradient(163.85deg,#1d2129_0%,#00308f_100%)]
        "
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

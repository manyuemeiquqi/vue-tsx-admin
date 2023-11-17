import { Col, Row } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import LoginForm from '@/views/login/LoginForm'
import LoginBanner from '@/views/login/LoginBanner'
export default defineComponent({
  setup() {
    return () => (
      <div class=" h-screen flex">
        <div
          class=" w-[34.375rem] bg-cyan-100  
          bg-[linear-gradient(_to_bottom,#4080ff,#5c9eff,#79b8ff,#96cfff,#b3d8ff,#d0e1ff,#edebff_)]
        "
        >
          <LoginBanner></LoginBanner>
        </div>
        <div class="flex-1">
          <LoginForm></LoginForm>
        </div>
      </div>
    )
  }
})

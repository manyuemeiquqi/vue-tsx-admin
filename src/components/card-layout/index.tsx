import { defineComponent } from 'vue'
interface Slots {
  default: any
}
export default defineComponent({
  name: 'CardLayout',
  setup(_, { slots }) {
    return () => (
      <div class="content-wrapper">{(slots as unknown as Slots).default()}</div>
    )
  }
})

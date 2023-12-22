import { defineComponent, KeepAlive, Transition, type VNode, h } from 'vue'
import { RouterView, type RouteLocationNormalizedLoaded } from 'vue-router'
import { get } from 'lodash'
export default defineComponent({
  name: 'PageComponent',
  setup() {
    return () => (
      <RouterView>
        {({ Component, route }: { Component: VNode; route: RouteLocationNormalizedLoaded }) => (
          <Transition>{Component}</Transition>
        )}
      </RouterView>
    )
  }
})

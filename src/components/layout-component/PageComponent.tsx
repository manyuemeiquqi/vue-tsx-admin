import { get } from 'lodash'
import { KeepAlive, Transition, defineComponent, type VNode } from 'vue'
import { RouterView, type RouteLocationNormalizedLoaded } from 'vue-router'
export default defineComponent({
  name: 'PageComponent',
  setup() {
    return () => (
      <RouterView>
        {({ Component, route }: { Component: VNode; route: RouteLocationNormalizedLoaded }) => (
          <Transition appear>
            {get(route, 'meta.ignoreCache') === true ? (
              Component
            ) : (
              <KeepAlive>{Component}</KeepAlive>
            )}
          </Transition>
        )}
      </RouterView>
    )
  }
})

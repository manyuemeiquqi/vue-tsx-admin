import { defineComponent, KeepAlive, Transition, type VNode, h } from 'vue'
import { RouterView, type RouteLocationNormalizedLoaded } from 'vue-router'
import { get } from 'lodash'
export default defineComponent({
  setup() {
    return () => (
      <RouterView>
        {({ Component, route }: { Component: VNode; route: RouteLocationNormalizedLoaded }) => (
          <Transition>
            {get(route, 'meta.ignoreCache') ? (
              <KeepAlive>
                {h(Component)}
                {/* 这里可以看出Component内部的实现可能是由 h 实现的也就是 createvnode */}
                {/* <Component></Component> */}
              </KeepAlive>
            ) : (
              h(Component)
              // <Component></Component>
            )}
          </Transition>
        )}
      </RouterView>
    )
  }
})

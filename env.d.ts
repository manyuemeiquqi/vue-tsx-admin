/// <reference types="vite/client" />

declare module '*.tsx' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@arco-design/color' {
  export { generate, getRgbStr }
}

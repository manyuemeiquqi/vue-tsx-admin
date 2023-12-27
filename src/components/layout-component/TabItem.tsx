import { useTabStore } from '@/store'
import { defaultTab, type TabItem } from '@/store/modules/tab'
import { ViewNames } from '@/types/constants'
import { Doption, Dropdown } from '@arco-design/web-vue'
import {
  IconClose,
  IconFolderDelete,
  IconRefresh,
  IconSwap,
  IconToLeft,
  IconToRight
} from '@arco-design/web-vue/es/icon'
import { cloneDeep } from 'lodash'
import { computed, defineComponent, withModifiers, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import styles from './style.module.scss'
enum TabActionType {
  reload = 'reload',
  current = 'current',
  left = 'left',
  right = 'right',
  others = 'others',
  all = 'all'
}
export default defineComponent({
  name: 'TabItem',
  props: {
    itemData: {
      type: Object as PropType<TabItem>,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const { t } = useI18n()
    const route = useRoute()
    const router = useRouter()
    const tabStore = useTabStore()

    const tabList = computed(() => {
      return tabStore.tabList
    })
    const findCurrentRouteIndex = () => {
      return tabList.value.findIndex((el) => el.name === route.name)
    }
    const handleTabClick = () => {
      router.push({
        path: props.itemData.fullPath
      })
    }
    const handleTabClose = () => {
      tabStore.deleteTab(props.itemData.name as ViewNames)
      if (props.itemData.name === route.name) {
        const prevTab = tabList.value[props.index - 1]
        router.push({ path: prevTab.fullPath })
      }
    }

    const handleSelect = async (value: unknown) => {
      const actionType = value
      switch (actionType) {
        case TabActionType.all: {
          tabStore.resetTabList()
          break
        }
        case TabActionType.others: {
          const filterList = tabList.value.filter((el, idx) => {
            return [0, props.index].includes(idx)
          })
          tabStore.freshTabList(filterList)
          break
        }
        case TabActionType.left: {
          const currentRouteIdx = findCurrentRouteIndex()
          const replaceList = cloneDeep(tabList.value).splice(props.index)
          tabStore.freshTabList([defaultTab, ...replaceList])
          if (currentRouteIdx < props.index) {
            router.push({ path: props.itemData.fullPath })
          }

          break
        }
        case TabActionType.right: {
          const currentRouteIdx = findCurrentRouteIndex()
          const replaceList = cloneDeep(tabList.value).splice(0, props.index + 1)
          tabStore.freshTabList(replaceList)
          if (currentRouteIdx > props.index) {
            router.push({ path: props.itemData.fullPath })
          }
          break
        }
        case TabActionType.reload: {
          router.push({
            name: ViewNames.redirect,
            params: {
              path: route.fullPath
            }
          })
          break
        }
        case TabActionType.current: {
          handleTabClose()
          break
        }
        default:
          break
      }
    }

    const disabledRight = computed(() => {
      return props.index === tabStore.tabList.length - 1
    })
    const disabledReload = computed(() => {
      return props.index !== findCurrentRouteIndex()
    })
    const disabledLeft = computed(() => {
      return [0, 1].includes(props.index)
    })
    const shouldClose = computed(() => props.index !== 0)
    const tagChecked = computed(() => props.itemData.name === route.name)
    return () => (
      <Dropdown onSelect={handleSelect} trigger="contextMenu" popupMaxHeight={false}>
        {{
          // argo tag exist bug,so use div
          default: () => (
            <span
              class={[
                'arco-tag',
                'arco-tag-size-medium',
                'arco-tag-checked',
                'cursor-pointer',
                'mr-2',
                tagChecked.value && styles['link-activated']
              ]}
              onClick={handleTabClick}
            >
              <span class={styles['tag-link']}>{t(props.itemData.title)}</span>
              {shouldClose.value && (
                <span
                  class="arco-icon-hover arco-tag-icon-hover arco-icon-hover-size-medium arco-tag-close-btn"
                  onClick={withModifiers(handleTabClose, ['stop'])}
                >
                  <icon-close />
                </span>
              )}
            </span>
          ),
          content: () => (
            <>
              <Doption disabled={disabledReload.value} value={TabActionType.reload}>
                <IconRefresh />
                <span>重新加载</span>
              </Doption>

              <Doption value={TabActionType.current}>
                <IconClose />
                <span>关闭当前标签页</span>
              </Doption>

              <Doption disabled={disabledLeft.value} value={TabActionType.left}>
                <IconToLeft />
                <span>关闭左侧标签页</span>
              </Doption>

              <Doption disabled={disabledRight.value} value={TabActionType.right}>
                <IconToRight />
                <span>关闭右侧标签页</span>
              </Doption>

              <Doption value={TabActionType.others}>
                <IconSwap />
                <span>关闭其他标签页</span>
              </Doption>

              <Doption value={TabActionType.all}>
                <IconFolderDelete />
                <span>关闭全部标签页</span>
              </Doption>
            </>
          )
        }}
      </Dropdown>
    )
  }
})

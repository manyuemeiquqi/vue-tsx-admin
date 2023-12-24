import { useTabStore } from '@/store'
import { AppRouteNames } from '@/types/constants'
import { Doption, Dropdown, Tag } from '@arco-design/web-vue'
import {
  IconClose,
  IconFolderDelete,
  IconRefresh,
  IconSwap,
  IconToLeft,
  IconToRight
} from '@arco-design/web-vue/es/icon'
import { cloneDeep } from 'lodash'
import { computed, defineComponent, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
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
    tabName: {
      type: String,
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
      return tabStore.getTabList
    })
    const findCurrentRouteIndex = () => {
      return tabList.value.findIndex((el) => el === route.name)
    }
    const handleTabClick = () => {
      router.push({
        name: props.tabName
      })
    }
    const handleTabClose = () => {
      tabStore.deleteTab(props.tabName as AppRouteNames)
      if (props.tabName === route.name) {
        const prevTab = tabList.value[props.index - 1]
        router.push({ name: prevTab })
      }
    }

    const handleSelect = async (value: unknown) => {
      const actionType = value as TabActionType
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
          router.push({ name: props.tabName })
          break
        }
        case TabActionType.left: {
          const currentRouteIdx = findCurrentRouteIndex()
          const replaceList = cloneDeep(tabList.value).splice(1, props.index - 1)
          tabStore.freshTabList(replaceList)
          if (currentRouteIdx < props.index) {
            router.push({ name: props.tabName })
          }
          break
        }
        case TabActionType.right: {
          const currentRouteIdx = findCurrentRouteIndex()
          const replaceList = cloneDeep(tabList.value).splice(props.index + 1)
          tabStore.freshTabList(replaceList)
          if (currentRouteIdx > props.index) {
            router.push({ name: props.tabName })
          }
          break
        }
        case TabActionType.reload: {
          router.push({
            name: AppRouteNames.redirect,
            params: {
              name: route.name as string
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
      return false
    })
    const disabledLeft = computed(() => {
      return [0, 1].includes(props.index)
    })
    const shouldClose = computed(() => props.index !== 0)
    const tagChecked = computed(() => props.tabName === route.name)
    return () => (
      <Dropdown onSelect={handleSelect} trigger="contextMenu" popupMaxHeight={false}>
        {{
          default: () => (
            <Tag
              color="arcoblue"
              class={['mr-1']}
              closable={shouldClose.value}
              checkable
              checked={tagChecked.value}
              onCheck={handleTabClick}
              onClose={handleTabClose}
            >
              <span class={['text-[var(--color-text-2)]']}>{t(props.itemData.title)}</span>
            </Tag>
          ),
          content: () => (
            <>
              <Doption value={TabActionType.reload}>
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

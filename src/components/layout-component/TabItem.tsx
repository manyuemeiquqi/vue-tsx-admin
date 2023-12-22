import { Doption, Dropdown } from '@arco-design/web-vue'
import {
  IconClose,
  IconFolderDelete,
  IconRefresh,
  IconSwap,
  IconToLeft,
  IconToRight
} from '@arco-design/web-vue/es/icon'
import { defineComponent, type PropType, withModifiers, computed } from 'vue'
import { type TagProps } from '@/types/global'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useTabStore } from '@/store'
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
      type: Object as PropType<TagProps>,
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
    const handleTabClose = (idx: number, tabData: TagProps) => {
      tabStore.deleteTag(idx, tabData)
      if (props.itemData.fullPath === route.fullPath) {
        const latest = tabList.value[idx - 1] // 获取队列的前一个tab
        router.push({ name: latest.name })
      }
    }

    const handleSelect = () => {}
    const handleTabClick = (routeName: string) => {
      router.push({
        name: routeName
      })
      return
    }

    const disabledRight = computed(() => {
      return false
    })
    const disabledLeft = computed(() => {
      return [0, 1].includes(props.index)
    })

    return () => (
      <Dropdown onSelect={handleSelect} trigger="contextMenu" popupMaxHeight={false}>
        {{
          default: () => (
            <span onClick={() => handleTabClick(props.itemData.name)}>
              <span>{t(props.itemData.title)}</span>
              <span
                onClick={withModifiers(() => handleTabClose(props.index, props.itemData), ['stop'])}
              >
                <IconClose />
              </span>
            </span>
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

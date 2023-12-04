import { Doption, Dropdown } from '@arco-design/web-vue'
import {
  IconClose,
  IconFolderDelete,
  IconRefresh,
  IconSwap,
  IconToLeft,
  IconToRight
} from '@arco-design/web-vue/es/icon'
import { defineComponent, type PropType } from 'vue'
import { type TagProps } from '@/types/global'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    itemData: {
      type: Object as PropType<TagProps>,
      default() {
        return {}
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const { t } = useI18n()
    return (
      <Dropdown trigger="contextMenu" popupMaxHeight={false}>
        {{
          default: () => (
            <span>
              <span>{t(props.itemData.title)}</span>
              <span>
                <IconClose />
              </span>
            </span>
          ),
          content: () => (
            <>
              <Doption>
                <IconRefresh />
                <span>重新加载</span>
              </Doption>

              <Doption>
                <IconRefresh />
                <span>重新加载</span>
              </Doption>

              <Doption>
                <IconClose />
                <span>关闭当前标签页</span>
              </Doption>

              <Doption>
                <IconToLeft />
                <span>关闭左侧标签页</span>
              </Doption>

              <Doption>
                <IconToRight />
                <span>关闭右侧标签页</span>
              </Doption>

              <Doption>
                <IconSwap />
                <span>关闭其他标签页</span>
              </Doption>

              <Doption>
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

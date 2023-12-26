import { Carousel } from '@arco-design/web-vue'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'loginBanner',
  setup() {
    const { t } = useI18n()

    const dataList = computed(() => [
      {
        slogan: t('login.banner.slogan3'),
        subSlogan: t('login.banner.subSlogan3'),
        image:
          'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/%E8%BD%AE%E6%92%AD%E5%9B%BE.png'
      },
      {
        slogan: t('login.banner.slogan1'),
        subSlogan: t('login.banner.subSlogan1'),
        image:
          'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/%E8%BD%AE%E6%92%AD%E5%9B%BE.png'
      },
      {
        slogan: t('login.banner.slogan2'),
        subSlogan: t('login.banner.subSlogan2'),
        image:
          'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/%E8%BD%AE%E6%92%AD%E5%9B%BE.png'
      }
    ])
    return () => (
      <Carousel class="h-full" animationName="fade">
        {dataList.value.map((item) => {
          return (
            <Carousel.Item>
              <div class="flex  justify-center items-center  flex-col  h-full">
                <div
                  class="text-[color:var(--color-fill-1)]
                 font-medium
                  text-xl
                "
                >
                  {item.slogan}
                </div>
                <div class={['text-[color:var(--color-text-3)]', 'mt-2', 'text-sm']}>
                  {item.subSlogan}
                </div>
                <img class={['w-80', 'mt-7']} src={item.image} alt="banner-image" />
              </div>
            </Carousel.Item>
          )
        })}
      </Carousel>
    )
  }
})

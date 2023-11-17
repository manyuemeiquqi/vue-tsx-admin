import { Carousel } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const { t } = useI18n()

    const dataList = [
      {
        slogan: t('login.banner.slogan1'),
        subSlogan: t('login.banner.subSlogan1'),
        image:
          'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6c85f43aed61e320ebec194e6a78d6d3.png~tplv-uwbnlip3yd-png.png'
      },
      {
        slogan: t('login.banner.slogan2'),
        subSlogan: t('login.banner.subSlogan2'),
        image:
          'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6c85f43aed61e320ebec194e6a78d6d3.png~tplv-uwbnlip3yd-png.png'
      },
      {
        slogan: t('login.banner.slogan3'),
        subSlogan: t('login.banner.subSlogan3'),
        image:
          'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6c85f43aed61e320ebec194e6a78d6d3.png~tplv-uwbnlip3yd-png.png'
      }
    ]
    return () => (
      <Carousel class="h-full">
        {dataList.map((item) => {
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
                <div
                  class="text-[color:var(--color-text-3)]  mt-2
                 text-sm
                "
                >
                  {item.subSlogan}
                </div>
                <img class="w-[20rem] mt-7" src={item.image} alt="banner-image" />
              </div>
            </Carousel.Item>
          )
        })}
      </Carousel>
    )
  }
})

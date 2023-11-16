import { Carousel } from '@arco-design/web-vue'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const dataList = [
      {
        slogan: t('login.banner.slogan1'),
        subSlogan: t('login.banner.subSlogan1'),
        image: bannerImage
      },
      {
        slogan: t('login.banner.slogan2'),
        subSlogan: t('login.banner.subSlogan2'),
        image: bannerImage
      },
      {
        slogan: t('login.banner.slogan3'),
        subSlogan: t('login.banner.subSlogan3'),
        image: bannerImage
      }
    ]
    return () => (
      <Carousel>
        {dataList.map((item, index) => {
          return (
            <div>
              <img src="" alt="banner-image" />
            </div>
          )
        })}
      </Carousel>
    )
  }
})

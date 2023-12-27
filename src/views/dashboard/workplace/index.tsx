import ContentPercentage from '@/views/dashboard/workplace/ContentPercentage'
import OverView from '@/views/dashboard/workplace/OverView'
import PopularContents from '@/views/dashboard/workplace/PopularContents'
import { Carousel, Grid, Space } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import Announcement from './Announcement'
import HelpDocs from './HelpDocs'
import RightTopArea from './RightTopArea'
import { ViewNames } from '@/types/constants'

export default defineComponent({
  name: ViewNames.workplace,
  setup() {
    const imageSrc = [
      'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/f7e8fc1e09c42e30682526252365be1c.jpg~tplv-uwbnlip3yd-webp.webp',
      'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/94e8dd2d6dc4efb2c8cfd82c0ff02a2c.jpg~tplv-uwbnlip3yd-webp.webp',
      'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/ec447228c59ae1ebe185bab6cd776ca4.jpg~tplv-uwbnlip3yd-webp.webp',
      'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/1d1580d2a5a1e27415ff594c756eabd8.jpg~tplv-uwbnlip3yd-webp.webp'
    ]
    return () => (
      <div class="flex">
        <div class={['flex-1', 'overflow-hidden']}>
          <Space size="medium" direction="vertical" fill>
            <OverView />
            <Grid.Row gutter={16}>
              <Grid.Col span={12}>
                <PopularContents />
              </Grid.Col>
              <Grid.Col span={12}>
                <ContentPercentage />
              </Grid.Col>
            </Grid.Row>
          </Space>
        </div>
        <div class="w-72 ml-4">
          <Space size="medium" direction="vertical" fill>
            <RightTopArea />
            <Carousel
              class={['h-40', 'rounded', 'hidden']}
              indicatorType="slider"
              showArrow="hover"
              autoPlay
            >
              {imageSrc.map((src, index) => (
                <Carousel.Item>
                  <div key={index}>
                    <img src={src} alt="image" class="w-full" />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
            <Announcement />

            <HelpDocs />
          </Space>
        </div>
      </div>
    )
  }
})

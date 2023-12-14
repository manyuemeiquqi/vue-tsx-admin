import { Carousel, Col, Grid, Space } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import ContentPercentage from '@/views/dashboard/workbench/ContentPercentage'
import OverView from '@/views/dashboard/workbench/OverView'
import PopularContents from '@/views/dashboard/workbench/PopularContents'
import Announcement from './Announcement'
import HelpDocs from './HelpDocs'
import RightTopArea from './RightTopArea'

export default defineComponent({
  setup() {
    const imageSrc = [
      'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/f7e8fc1e09c42e30682526252365be1c.jpg~tplv-uwbnlip3yd-webp.webp',
      'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/94e8dd2d6dc4efb2c8cfd82c0ff02a2c.jpg~tplv-uwbnlip3yd-webp.webp',
      'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/ec447228c59ae1ebe185bab6cd776ca4.jpg~tplv-uwbnlip3yd-webp.webp',
      'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/1d1580d2a5a1e27415ff594c756eabd8.jpg~tplv-uwbnlip3yd-webp.webp'
    ]
    return () => (
      <Grid.Row gutter={16}>
        <Grid.Col flex={1}>
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
        </Grid.Col>
        <Grid.Col flex="288px">
          <Space size="medium" direction="vertical" fill>
            <RightTopArea />
            <Carousel
              class="h-40  rounded  overflow-auto"
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
        </Grid.Col>
      </Grid.Row>
    )
  }
})

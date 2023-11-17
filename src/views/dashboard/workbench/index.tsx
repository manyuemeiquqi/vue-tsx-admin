import { Col, Row, Space } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import ContentPercentage from '@/views/dashboard/workbench/ContentPercentage'
import OverView from '@/views/dashboard/workbench/OverView'
import PopularContents from '@/views/dashboard/workbench/PopularContents'

export default defineComponent({
  setup() {
    return () => (
      <div>
        <Space>
          <OverView />
          <Row>
            <Col span={12}>
              <PopularContents></PopularContents>
            </Col>
            <Col span={12}>
              <ContentPercentage></ContentPercentage>
            </Col>
          </Row>
        </Space>
      </div>
    )
  }
})

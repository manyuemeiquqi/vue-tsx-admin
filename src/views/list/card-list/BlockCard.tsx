import useLoading from '@/hooks/loading'
import { Button, Card, Switch, Skeleton, Descriptions,  Typography } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const { loading, setLoading } = useLoading()
    const { t } = useI18n()
    const getContent = () => {
      if (loading) {
        return <Skeleton animation />
      }
      if (type !== 'quality') {
        return <Typography.Paragraph>{card.description}</Typ>
      }
      return (
        <Descriptions
          column={2}
          data={[
            { label: '待质检数', value: card.qualityCount },
            { label: '积压时长', value: `${card.duration}s` },
            { label: '待抽检数', value: card.randomCount }
          ]}
        />
      )
    }
    const getButtonGroup = () => {
      if (type === 'quality') {
        return (
          <>
            <Button type="primary" style={{ marginLeft: '12px' }} loading={loading.value}></Button>

            <Button loading={loading.value}></Button>
          </>
        )
      }

      if (type === 'service') {
        return (
          <>
            {status === 1 ? (
              <Button loading={loading.value} onClick={changeStatus}></Button>
            ) : (
              <Button type="outline" loading={loading.value} onClick={changeStatus}></Button>
            )}
          </>
        )
      }

      return <Switch loading={loading.value} onChange={changeStatus} />
    }
    return (
      <Card size="small">
        <div>{getContent()}</div>
        <div>{getButtonGroup()}</div>
      </Card>
    )
  }
})

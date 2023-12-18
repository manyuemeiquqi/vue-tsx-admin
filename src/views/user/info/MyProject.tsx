import { queryMyProjectList, type ProjectItem } from '@/api/user'
import useLoading from '@/hooks/loading'
import {
  Avatar,
  AvatarGroup,
  Card,
  Grid,
  Link,
  Skeleton,
  Space,
  Typography
} from '@arco-design/web-vue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'MyProject',
  setup() {
    const { t } = useI18n()
    const dataSource = ref<ProjectItem[]>([])
    const fillList: unknown[] = new Array(6).fill(undefined)
    const { loading, setLoading } = useLoading(true)

    const fetchData = () => {
      queryMyProjectList()
        .then((res) => {
          dataSource.value = res.data
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false)
        })
    }

    fetchData()
    return () => (
      <Card class="general-card" bordered={false} title={t('userInfo.title.myProject')}>
        {{
          default: () => {
            return (
              <Grid cols={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 3, xxl: 3 }} colGap={16} rowGap={16}>
                {loading.value
                  ? fillList.map(() => (
                      <Card>
                        <Skeleton loading={loading.value} animation>
                          <Skeleton.Line rows={3}></Skeleton.Line>
                        </Skeleton>
                      </Card>
                    ))
                  : dataSource.value.map((item) => (
                      <Card>
                        <Space direction="vertical">
                          <Typography.Text>{item.name}</Typography.Text>
                          <Typography.Text>{item.description}</Typography.Text>
                          <Space>
                            <AvatarGroup size={24}>
                              {item.contributors.map((contributor: any) => (
                                <Avatar size={32}>
                                  <img src={contributor.avatar} alt="avatar" />
                                </Avatar>
                              ))}
                            </AvatarGroup>
                            <Typography.Text>等{item.peopleNumber}人</Typography.Text>
                          </Space>
                        </Space>
                      </Card>
                    ))}
              </Grid>
            )
          },
          extra: () => <Link>{t('userInfo.showMore')}</Link>
        }}
      </Card>
    )
  }
})

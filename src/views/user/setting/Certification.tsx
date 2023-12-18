import { queryCertification, type UnitCertification } from '@/api/user'
import useLoading from '@/hooks/loading'
import {
  Badge,
  Card,
  Descriptions,
  Link,
  Space,
  Table,
  Tag,
  type TableData
} from '@arco-design/web-vue'
import type { DescData } from '@arco-design/web-vue/es/descriptions/interface'
import { computed, defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'Certification',
  setup() {
    const { t } = useI18n()

    const { loading, setLoading } = useLoading(true)
    const responseData = ref<UnitCertification>()
    const fetchData = async () => {
      try {
        const { data } = await queryCertification()
        responseData.value = data
      } catch (err) {
        /* empty */
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    const columns = computed(() => [
      {
        title: t('userSetting.certification.columns.certificationType'),
        render() {
          return t('userSetting.certification.cell.certificationType')
        }
      },
      {
        title: t('userSetting.certification.columns.certificationContent'),
        dataIndex: 'certificationContent'
      },
      {
        title: t('userSetting.certification.columns.status'),
        render({ record }: { record: TableData }) {
          return record.status === 0 ? (
            <Badge status="success" text={t('userSetting.certification.cell.auditing')}></Badge>
          ) : (
            <Badge status="processing" text={t('userSetting.certification.cell.pass')}></Badge>
          )
        }
      },
      {
        title: t('userSetting.certification.columns.time'),
        dataIndex: 'time'
      },
      {
        title: t('userSetting.certification.columns.operation'),
        render: ({ record }: { record: TableData }) => {
          if (record.status !== 0) {
            return <Link>{t('userSetting.certification.button.check')}</Link>
          }
          return (
            <Space>
              <Link>{t('userSetting.certification.button.check')}</Link>
              <Link>{t('userSetting.certification.button.withdraw')}</Link>
            </Space>
          )
        }
      }
    ])
    const descData = computed(() => {
      const enterpriseInfo = responseData.value?.enterpriseInfo
      if (!enterpriseInfo) return []
      const {
        accountType,
        status,
        time,
        legalPerson,
        certificateType,
        authenticationNumber,
        enterpriseName,
        enterpriseCertificateType,
        organizationCode
      } = enterpriseInfo
      return [
        {
          label: t('userSetting.certification.label.accountType'),
          value: accountType
        },
        {
          label: t('userSetting.certification.label.status'),
          value: status
        },
        {
          label: t('userSetting.certification.label.time'),
          value: time
        },
        {
          label: t('userSetting.certification.label.legalPerson'),
          value: legalPerson
        },
        {
          label: t('userSetting.certification.label.certificateType'),
          value: certificateType
        },
        {
          label: t('userSetting.certification.label.authenticationNumber'),
          value: authenticationNumber
        },
        {
          label: t('userSetting.certification.label.enterpriseName'),
          value: enterpriseName
        },
        {
          label: t('userSetting.certification.label.enterpriseCertificateType'),
          value: enterpriseCertificateType
        },
        {
          label: t('userSetting.certification.label.organizationCode'),
          value: organizationCode
        }
      ] as DescData[]
    })
    return () => (
      <div>
        <Card
          class="general-card"
          loading={loading.value}
          title={t('userSetting.certification.title.enterprise')}
        >
          {{
            default: () => (
              <Descriptions
                class={['bg-[rgb(var(--gray-1))]', 'p-5']}
                column={3}
                align="right"
                layout="inline-horizontal"
                label-style={{ fontWeight: 'normal' }}
                value-style={{
                  width: '200px',
                  paddingLeft: '8px',
                  textAlign: 'left'
                }}
                data={descData.value}
              >
                {{
                  label: ({ label }: { label: string }) => label + ' :',
                  value: ({ value, data }: { data: DescData; value: unknown }) => {
                    if (data.label === t('userSetting.certification.label.status'))
                      return (
                        <Tag size="small" color="green">
                          已认证
                        </Tag>
                      )
                    else return value
                  }
                }}
              </Descriptions>
            ),
            extra: () => <Link>{t('userSetting.certification.extra.enterprise')}</Link>
          }}
        </Card>
        <Card class="general-card" title={t('userSetting.certification.title.record')}>
          <Table
            loading={loading.value}
            data={responseData.value?.record}
            columns={columns.value}
          ></Table>
        </Card>
      </div>
    )
  }
})

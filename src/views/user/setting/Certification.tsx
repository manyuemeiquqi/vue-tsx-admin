import { queryCertification, type UnitCertification } from '@/api/user'
import useLoading from '@/hooks/loading'
import { Card, Descriptions, Link, Table, Badge, Button, Space, Tag } from '@arco-design/web-vue'
import { computed, defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { DescData } from '@arco-design/web-vue/es/descriptions/interface'
export default defineComponent({
  setup() {
    const { t } = useI18n()

    const { loading, setLoading } = useLoading(true)
    const data = ref<UnitCertification>()
    const fetchData = async () => {
      try {
        const { data: resData } = await queryCertification()
        data.value = resData
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    const columns = [
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
        render({ record }: any) {
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
        render: ({ record }: any) => {
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
    ]
    const descData = computed(() => {
      const enterpriseInfo = data.value?.enterpriseInfo
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
          label: 'userSetting.certification.label.accountType',
          value: accountType
        },
        {
          label: 'userSetting.certification.label.status',
          value: status
        },
        {
          label: 'userSetting.certification.label.time',
          value: time
        },
        {
          label: 'userSetting.certification.label.legalPerson',
          value: legalPerson
        },
        {
          label: 'userSetting.certification.label.certificateType',
          value: certificateType
        },
        {
          label: 'userSetting.certification.label.authenticationNumber',
          value: authenticationNumber
        },
        {
          label: 'userSetting.certification.label.enterpriseName',
          value: enterpriseName
        },
        {
          label: 'userSetting.certification.label.enterpriseCertificateType',
          value: enterpriseCertificateType
        },
        {
          label: 'userSetting.certification.label.organizationCode',
          value: organizationCode
        }
      ] as DescData[]
    })
    return () => (
      <div>
        <Card class="general-card" title={t('userSetting.certification.title.enterprise')}>
          {{
            default: () => (
              <Descriptions
                class={' bg-[rgb(var(--gray-1))] p-5'}
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
                  label: ({ label }: any) => t(label),
                  value: ({ value, data }: any) => {
                    if (data.label === 'userSetting.certification.label.status')
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
          <Table data={data.value?.record} columns={columns}></Table>
        </Card>
      </div>
    )
  }
})

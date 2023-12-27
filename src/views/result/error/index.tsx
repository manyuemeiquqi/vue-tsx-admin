import CardLayout from '@/components/card-layout'
import { ViewNames } from '@/types/constants'
import { Button, Link, Result, Space, Typography } from '@arco-design/web-vue'
import { IconLink } from '@arco-design/web-vue/es/icon'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: ViewNames.error,
  setup() {
    const { t } = useI18n()
    return () => (
      <div>
        <CardLayout>
          <Result
            class="!px-32"
            status="error"
            title={t('error.result.title')}
            subtitle={t('error.result.subTitle')}
          >
            {{
              extra: () => (
                <Space size="medium">
                  <Button type="secondary">{t('error.result.goBack')}</Button>
                  <Button type="primary">{t('error.result.retry')}</Button>
                </Space>
              ),
              default: () => (
                <div class={['bg-[rgb(var(--gray-1))]', 'mt-10', 'min-w-fit', 'p-5']}>
                  <Typography.Title heading={6}>{t('error.detailTitle')}</Typography.Title>
                  <Typography.Paragraph>
                    <ol>
                      <li>
                        {t('error.detailLine.record')}
                        <Link>
                          <IconLink />
                          {t('error.detailLine.record.link')}
                        </Link>
                      </li>
                      <li>{t('error.detailLine.auth')}</li>
                    </ol>
                  </Typography.Paragraph>
                </div>
              )
            }}
          </Result>
        </CardLayout>
      </div>
    )
  }
})

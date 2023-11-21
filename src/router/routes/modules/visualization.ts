const VISUALIZATION: any = {
  path: '/visualization',
  name: 'visualization',
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.visualization',
    requiresAuth: true,
    icon: 'icon-apps',
    order: 1
  },
  children: [
    {
      path: 'data-analysis',
      name: 'DataAnalysis',
      component: () => import('@/views/visualization/data-analysis/index'),
      meta: {
        locale: 'menu.visualization.dataAnalysis',
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: 'multi-dimension-data-analysis',
      name: 'MultiDimensionDataAnalysis',
      component: () => import('@/views/visualization/multi-dimension-data-analysis/index'),
      meta: {
        locale: 'menu.visualization.multiDimensionDataAnalysis',
        requiresAuth: true,
        roles: ['admin']
      }
    }
  ]
}

export default VISUALIZATION

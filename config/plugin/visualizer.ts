/**
 * Generation packaging analysis
 * 生成打包分析
 */
import visualizer from 'rollup-plugin-visualizer'

export default function configVisualizerPlugin() {
  return visualizer({
    filename: 'stats.html',
    open: true,
    gzipSize: true,
    brotliSize: true
  })
}

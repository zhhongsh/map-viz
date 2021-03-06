/**
 * WebCell Echarts可视化通用组件
 * 本地图组件为使用echarts进行开发提供了基础组件
 * @author: shadowingszy
 *
 * 传入props说明:
 * chartOptions: echarts中的所有options。
 */

import { observer } from 'mobx-web-cell';
import { component, mixin, createCell, attribute, watch } from 'web-cell';
import echarts from 'echarts';

interface ChartProps {
  chartOptions?: any;
}

@observer
@component({
  tagName: 'web-cell-echarts',
  renderTarget: 'children'
})
export class WebCellEcharts extends mixin<ChartProps, {}>() {
  @attribute
  @watch
  public chartOptions: Object = {};

  chartId = this.generateChartId();
  chart = null;

  /**
   * 使用随机数+date生成当前组件的唯一ID
   */
  generateChartId() {
    const random = Math.floor(Math.random() * 100);
    const dateStr = new Date().getTime();
    return 'map' + random.toString() + dateStr.toString();
  }

  connectedCallback() {
    setTimeout(() => {
      this.chart = echarts.init(document.getElementById(this.chartId));
      this.chart.setOption(this.chartOptions);
      let onResizeFunction = (window as any).onresize;
      window.onresize = () => {
        if (onResizeFunction) {
          onResizeFunction();
        }
        this.chart.resize();
      };
    }, 0);
  }

  public render() {
    if (this.chart) {
      this.chart.setOption(this.props.chartOptions, false, false);
    }
    return (
      <div id={this.chartId} style={{ width: '100%', height: '100%' }}></div>
    );
  }
}

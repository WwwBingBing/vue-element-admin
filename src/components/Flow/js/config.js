export default {
  // 默认设置参数

  // 动态锚点、位置自适应
  Anchors: ['Top', 'TopCenter', 'TopRight', 'TopLeft', 'Right', 'RightMiddle', 'Bottom', 'BottomCenter',
    'BottomRight', 'BottomLeft', 'Left', 'LeftMiddle'],
  // Container: 'flowContent',
  // 连线的样式 StateMachine、Flowchart,有四种默认类型：Bezier（贝塞尔曲线），Straight（直线），Flowchart（流程图），State machine（状态机）
  Connector: 'Flowchart',
  // 鼠标不能拖动删除线
  ConnectionsDetachable: false,
  // 删除线的时候节点不删除
  DeleteEndpointsOnDetach: false,
  // 连线的端点
  Endpoint: ['Dot', { radius: 0 }],
  // 线端点的样式
  EndpointStyle: {
    fill: 'rgba(0,0,0,0)',
    outlineWidth: 0
  },
  LogEnabled: true, // 是否打开jsPlumb的内部日志记录
  // 绘制线
  PaintStyle: {
    stroke: '#409eff',
    strokeWidth: 0
  },
  // 绘制箭头
  Overlays: [
    ['Arrow', {
      width: 12,
      length: 12,
      location: 1
    }]
  ],
  RenderMode: 'svg'
}

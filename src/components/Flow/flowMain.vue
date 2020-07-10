<template>
  <div class="appcontainer">
    <div class="mainContainer"
         ref="detail">
      <div :id="flowContentId"
           ref="flowContent"
           class="flowContent">
        <flowNode v-for="node in data.nodeList"
                  :key="node.id"
                  :node="node"
                  :id="node.id"
                  @edit-node="editNode"
                  @look-node="lookNode">
        </flowNode>
      </div>
    </div>
    <div class="savebtn">
      <el-button icon="el-icon-plus"
                 @click="openAddNodeDialog"
                 size="small"
                 plain
                 type="primary">添加</el-button>
    </div>
    <add-node @confirm-edit-node='addNewNode'
              :isShowNodeDialog='isShowNodeDialog'
              @hide-node-dialog='hideNodeDialog'
              :type='nodeDialogType'
              :nodeData='editDialogNodeData'></add-node>

  </div>
</template>

<script>
import { jsPlumb } from 'jsPlumb'
import config from './js/config'
import flowNode from './flowNode.vue'
import addNode from './addAndEditNode.vue'
import panZoom from './js/moveAndZoom'

export default {
  name: 'flowMain',
  props: ['nodeData', 'flowContentId'], // 流程图数据 id
  data () {
    return {
      isShowNodeDialog: false, // 控制增加/查看/编辑对话框
      nodeDialogType: 'add', // node节点对话框类型
      editDialogNodeData: {}, // node节点对话框数据
      jsPlumb: null, // jsPlumb 实例
      // jsplumb连接参数
      jsplumbConnectOptions: {
        isSource: true,
        isTarget: true,
        // 动态锚点、提供了4个方向 Continuous、AutoDefault
        anchor: 'Continuous'
      },
      // 是否加载完毕
      loadEasyFlowFinish: false,
      // 数据
      data: {
        flowInfo: this.nodeData.flowInfo,
        nodeList: this.nodeData.nodeList,
        lineList: this.nodeData.lineList
      },
      distance: 10
    }
  },
  components: {
    flowNode,
    addNode
  },
  created () { },
  mounted () {
    this.jsPlumb = jsPlumb.getInstance(config)
    // 通过flowId 和 jsPlumb对象 创建panzoom对象
    panZoom.init(this.flowContentId, this.jsPlumb)
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init () {
      const _this = this
      this.jsPlumb.ready(function () {
        // 会使整个jsPlumb立即重绘。
        _this.jsPlumb.setSuspendDrawing(false, true)
        // 初始化节点
        _this.loadEasyFlow()
        // 连线 更新数据
        _this.jsPlumb.bind('connection', function (evt) {
          let from = evt.sourceId
          let to = evt.targetId
          if (_this.loadEasyFlowFinish) {
            _this.data.lineList.push({
              from: from,
              to: to,
              id: _this.getUUID()
            })
          };
        })
        // 删除连线
        _this.jsPlumb.bind('connectionDetached', function (evt) {
          _this.deleteLine(evt.sourceId, evt.targetId)
        })
      })
    },
    // 加载流程图
    loadEasyFlow () {
      // 初始化连线
      for (var j = 0; j < this.data.lineList.length; j++) {
        let line = this.data.lineList[j]
        this.jsPlumb.connect({
          source: line.from,
          target: line.to
        }, this.jsplumbConnectOptions)
      }
      this.$nextTick(function () {
        this.loadEasyFlowFinish = true
      })
    },
    // 添加元素
    addNewNode (node) {
      var temp = {}
      temp = {
        id: this.getUUID(),
        people: node.people,
        top: event.offsetY + this.distance + 'px',
        left: event.offsetX + this.distance + 'px'
      }
      this.distance += 10

      this.data.nodeList.push(temp)
      // 如果选择了开始节点和结束节点
      if (node.startNode && node.endNode) {
        this.$nextTick(() => {
          // 把新节点连接好
          this.addConn(node.startNode, temp.id)
          this.addConn(temp.id, node.endNode)
          // 删除之前的连接线
          this.delConn(node.startNode, node.endNode)
        })
      }
    },
    // 编辑节点
    editNode (node) {
      this.nodeDialogType = 'edit'
      this.editDialogNodeData = node
      this.isShowNodeDialog = true
    },
    // 查看节点
    lookNode (node) {
      this.nodeDialogType = 'look'
      this.editDialogNodeData = node
      this.isShowNodeDialog = true
    },
    // 打开新增节点对话框
    openAddNodeDialog () {
      this.nodeDialogType = 'add'
      this.editDialogNodeData = {}
      this.isShowNodeDialog = true
    },
    // 取消新建节点
    hideNodeDialog (val) {
      this.isShowNodeDialog = val
    },
    // 删除指定连接线 - 绘图层
    delConn (sourceId, targetId) {
      // 获取所有连接线
      let allConnect = this.jsPlumb.getAllConnections()
      allConnect.map((val, i) => {
        // 找到匹配的连接线
        if (val.targetId === targetId && val.sourceId === sourceId) {
          // 删除该线
          this.jsPlumb.deleteConnection(allConnect[i])
          return true
        }
      })
    },
    // 删除连线线-数据层
    deleteLine (from, to) {
      this.data.lineList = this.data.lineList.filter(function (line) {
        return line.from !== from && line.to !== to
      })
    },
    // 增加连接线 - 绘图层
    addConn (sourceId, targetId) {
      this.jsPlumb.connect({
        source: sourceId,
        target: targetId
      }, this.jsplumbConnectOptions)
    },
    // 随机生产id
    getUUID () {
      var s = []
      var hexDigits = '0123456789abcdef'
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = '-'
      var uuid = s.join('')
      return uuid
    },
    // 保存数据
    saveData () {
      this.jsPlumb.repaintEverything()
      console.log(this.data)
    }
  }
}
</script>

<style lang="scss">
.appcontainer {
  display: flex;
  /* height: calc(100vh - 20px); */
  color: #606266;
  padding: 10px;
  min-height: 400px;
  position: relative;
}

.mainContainer {
  flex: 1;
  border: 1px solid #ebeef5;
  padding: 12px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  word-break: break-all;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.flowContent {
  width: 100%;
  height: 100%;
  position: relative;
}

.item {
  position: absolute;
  width: 60px;
  height: 90px;
  border: 1px solid #007aff;
}

.flow-menu {
  width: 100px;
  padding: 10px;
  margin: 0 10px;
  border: 1px solid #ebeef5;
  padding: 12px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  word-break: break-all;
  border-radius: 4px;
}
.csslabel {
  color: #434343;
  font-weight: 400;
  z-index: 10;
  font-size: 12px;
  color: #409eff;
  background: #fff;
}
.csslabel .label-text {
  background-color: white;
}
.savebtn {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>

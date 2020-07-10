<template>
  <div class="node-item"
       ref="node"
       :style="flowContainerStyle"
       @mouseenter="showEdit"
       @mouseleave="hideEdit">
    <div class="node-con">
      <div class="title">
        <span class="title-dot"
              :style="nodeDotStyle"></span>
        责任人：
        <span> {{node.people}}</span>
      </div>
      <div class="summary">
        {{ node.summary }}
      </div>
      <div class="time">
        <i class="el-icon-time"
           style="margin-right:5px;"></i>
        截止时间：
        <span> {{node.time}}</span>
      </div>
    </div>
    <div class="edit-box"
         v-show="isShowEdit">
      <div @click.stop="lookNode">
        <i class="el-icon-search"></i>
      </div>
      <div @click.stop="editNode">
        <i class="el-icon-edit"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    node: Object
  },
  data () {
    return {
      isShowEdit: false
    }
  },
  computed: {
    // 节点容器样式
    flowContainerStyle: {
      get () {
        let backgroundColor = ''
        let border = ''

        switch (this.node.status) {
          case 0: // 未开始
            backgroundColor = '#F4F4F5'
            border = '1px solid #D3D4D6'
            break
          case 1: // 已完成
            backgroundColor = '#fff'
            border = '1px solid #d5d6d7'
            break
          case 2: // 进行中
            backgroundColor = 'rgba(46,105,235,0.10)'
            border = '1px solid #ADC4F8'
            break
          case 3: // 已超时
            backgroundColor = '#FFEFF0'
            border = '1px solid #FAC1C1'
            break
          default:
            backgroundColor = '#F4F4F5'
            border = '1px solid #D3D4D6'
            break
        }
        return {
          top: this.node.top,
          left: this.node.left,
          backgroundColor,
          border
        }
      }
    },
    nodeDotStyle: {
      get () {
        let color = ''
        switch (this.node.status) {
          case 0:
            color = '#999'
            break
          case 1:
            color = '#67C23A'
            break
          case 2:
            color = '#2E69EB'
            break
          case 3:
            color = '#EA5B5B'
            break
          default:
            color = '#999'
            break
        }
        return {
          backgroundColor: color
        }
      }
    }
  },
  methods: {
    // 查看节点
    lookNode () {
      this.$emit('look-node', this.node)
    },
    // 编辑节点
    editNode () {
      this.$emit('edit-node', this.node)
    },
    // 鼠标进入
    showEdit () {
      this.isShowEdit = true
    },
    // 鼠标离开
    hideEdit () {
      this.isShowEdit = false
    }
  }
}
</script>
<style lang="scss" scoped>
.node-item {
  position: absolute;
  height: 148px;
  width: 215px;
  border-radius: 6px;
  cursor: pointer;
  padding: 15px;
  .node-con {
    display: flex;
    flex-direction: column;
    height: 100%;
    .title {
      height: 20px;
      font-size: 14px;
      color: #333;
    }
    .time {
      font-family: FZLTHJW--GB1-0;
      font-size: 12px;
      color: #888888;
      height: 15px;
    }
    .summary {
      flex-grow: 1;
      margin: 12px 0;
      font-family: FZLTHJW--GB1-0;
      font-size: 13px;
      color: #888888;
      display: -webkit-box;
      line-clamp: 3;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .title-dot {
      display: inline-block;
      vertical-align: middle;
      width: 6px;
      height: 6px;
      border-radius: 3px;
    }
  }
}

.edit-box {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 30px;
  font-size: 20px;
  color: #c4c4c4;
  border-radius: 6px;
  div {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.4);
    text-align: center;
    line-height: 50px;
    &:hover {
      color: #fff;
    }
  }
}
</style>

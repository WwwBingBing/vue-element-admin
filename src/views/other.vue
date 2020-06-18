<template>
  <div class="hello">
    <!-- <div class="footer"
         ref="footer">
      <div class="mask"
           :style="{left:maskLeft*index + 'px',width:maskLeft + 'px'}"></div>
      <ul>
        <li @click="index=0"
            :class="{active:index==0}">
          <svg-icon icon-class='s-home'
                    class-name='footer-icon'></svg-icon>
          <div>首页</div>
        </li>
        <li @click="index=1"
            :class="{active:index==1}">
          <svg-icon icon-class='search'
                    class-name='footer-icon'></svg-icon>
          <div>发现</div>
        </li>
        <li @click="index=2"
            :class="{active:index==2}">
          <svg-icon icon-class='star-on'
                    class-name='footer-icon'></svg-icon>
          <div>推荐</div>
        </li>
        <li @click="getData"
            :class="{active:index==3}">
          <svg-icon icon-class='user-solid'
                    class-name='footer-icon'></svg-icon>
          <div>我的</div>
        </li>
      </ul>
    </div> -->
    <flow-main :nodeData='nodeData'></flow-main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import flowMain from '@/components/Flow/flowMain'

// import $ from 'jquery'
export default {
  name: 'Other',
  components: {
    flowMain
  },
  computed: {
    ...mapGetters(['size', 'token'])
  },
  data () {
    return {
      msg: 'abcd',
      isCheck: true,
      maskLeft: 200,
      index: 0,
      bpmnModeler: null,
      nodeData: {
        flowInfo: {
          Id: Math.random().toString(16).slice(2, 8),
          name: '流程111',
          remark: '这是备注'
        },
        nodeList: [
          {
            type: 3,
            id: '0',
            detail: '开始',
            left: '20px',
            top: '149px'
          },
          {
            type: 3,
            id: '1',
            detail: '任务1',
            left: '220px',
            top: '100px'
          },
          {
            type: 3,
            id: '2',
            detail: '任务2',
            left: '420px',
            top: '100px'
          },
          {
            type: 3,
            id: '3',
            detail: '任务3',
            left: '520px',
            top: '149px'
          },
          {
            type: 3,
            id: '4',
            detail: '结束',
            left: '820px',
            top: '149px'
          }
        ],
        lineList: [
          {
            from: '0',
            to: '3',
            id: 'l1'
          },
          {
            from: '0',
            to: '1',
            id: 'l2'
          },
          {
            from: '3',
            to: '4',
            id: 'l2'
          },
          {
            from: '1',
            to: '2',
            id: 'l2'
          },
          {
            from: '2',
            to: '4',
            id: 'l2'
          }
        ]
      }
    }
  },
  mounted () {
    // let footer = this.$refs.footer
    // let liLen = footer.children[1].children.length
    // this.maskLeft = footer.offsetWidth / liLen
  },
  methods: {
    getData () {
      // let p = new Promise(function (resolve, reject) {
      //   resolve('asd')
      // }).then(res => {
      //   console.log(res)
      // })
    },
    sumNums (n) {
      let arr = new Array(n + 1).fill('_')
      let res = []
      arr.reduce((total, current, index) => {
        res.push(index)
      }, 0)
      return res
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
}
.footer {
  height: 60px;
  width: 500px;
  max-width: 800px;
  overflow: hidden;
  background: #fff;
  position: relative;
  color: #fff;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  .mask {
    position: absolute;
    background: #61a8ff;
    top: 0;
    height: 100%;
    transition: all 0.5s linear;
    z-index: 0;
  }
  ul {
    display: flex;
    justify-content: space-between;
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: rgb(245, 147, 147);
    li {
      width: 25%;
      height: 60px;
      padding-top: 5px;
      text-align: center;
      position: relative;
      z-index: 2;

      cursor: pointer;
      .footer-icon {
        transition: all 0.2s linear;
        font-size: 24px;
        margin-bottom: 8px;
        margin-top: 10px;
        transform: scale(0.8);
      }
      > div {
        opacity: 0;
      }
      &:hover,
      &.active {
        > div {
          opacity: 1;
        }
        .footer-icon {
          transform: scale(1);
          font-size: 24px;
          margin-top: 0;
        }
      }
    }
  }
}
</style>

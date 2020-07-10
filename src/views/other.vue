<template>
  <div class="hello">
    <!--  flowContentId 不可重复 -->
    <flow-main :nodeData='nodeData'
               :flowContentId='flowContentId'></flow-main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import flowMain from '@/components/Flow/flowMain'

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
      dialogVisible: false,
      msg: 'abcd',
      flowContentId: 'flow1',
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
            id: '0',
            people: 'qwe',
            left: '20px',
            top: '149px',
            time: '2020-1-2',
            summary: '这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要',
            status: 0
          },
          {
            id: '1',
            people: 'asd',
            left: '270px',
            top: '50px',
            summary: '这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要',
            time: '2020-1-2',
            status: 1
          },
          {
            id: '2',
            people: 'zxc',
            left: '620px',
            top: '50px',
            summary: '这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要',
            time: '2020-1-2',
            status: 2
          },
          {
            id: '3',
            people: 'dfg',
            left: '1020px',
            top: '149px',
            summary: '这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要',
            time: '2020-1-2',
            status: 3
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
            from: '1',
            to: '2',
            id: 'l2'
          },
          {
            from: '2',
            to: '3',
            id: 'l2'
          }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    sumNums (n) {
      let arr = new Array(n + 1).fill('_')
      let res = []
      arr.reduce((total, current, index) => {
        res.push(index)
      }, 0)
      return res
    },
    addFlowNode () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped c>
.hello {
}
</style>

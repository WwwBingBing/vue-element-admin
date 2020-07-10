<template>
  <el-dialog :visible.sync="isShowNodeDialog"
             :show-close='false'
             center
             :close-on-click-modal='false'
             :close-on-press-escape='false'
             top='10vh'
             width="30%">
    <el-form label-position="top"
             :rules="rules"
             ref="nodeForm"
             :model="nodeForm">
      <el-form-item label="标题"
                    prop="title">
        <el-input v-model="nodeForm.title"
                  placeholder="输入标题文字"
                  size="mini"></el-input>
      </el-form-item>
      <el-form-item label="描述"
                    prop="summary">
        <el-input v-model="nodeForm.summary"
                  placeholder="输入描述"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  size="mini"></el-input>
      </el-form-item>
      <el-form-item label="附件">
        <el-input v-model="nodeForm.file"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  size="mini"></el-input>
      </el-form-item>
      <el-form-item label="任务顺序">
        <el-button v-if="!nodeForm.startNode"
                   size='mini'
                   plain
                   type="primary">点击从图中选择</el-button>
        <el-input v-if="nodeForm.startNode"
                  v-model="nodeForm.startNode"
                  size="mini"></el-input>
        <el-input v-if="nodeForm.startNode"
                  v-model="nodeForm.endNode"
                  size="mini"></el-input>
      </el-form-item>
      <el-form-item label="优先级"
                    prop="priority">
        <el-select v-model="nodeForm.priority"
                   size="mini"
                   placeholder="请选择优先级">
          <el-option v-for="item in priorityOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="截止日期"
                    prop="endDate">
        <el-date-picker v-model="nodeForm.endDate"
                        type="date"
                        size="mini"
                        format="yyyy-MM-dd"
                        value-format="timestamp"
                        :clearable='false'
                        placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="责任人"
                    prop="people">
        <el-input v-model="nodeForm.people"
                  size="mini"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button type="primary"
                 @click="addNode">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'addNode',
  props: {
    isShowNodeDialog: {
      require: true,
      type: Boolean,
      default: false
    },
    type: {
      require: false,
      type: String,
      default: 'add'
    },
    nodeData: {
      require: false,
      type: Object
    }
  },
  data () {
    return {
      // 新建节点数据
      nodeForm: {
        title: '',
        summary: '',
        people: '',
        startNode: '',
        endNode: '',
        priority: '',
        endDate: '',
        file: ''
      },
      // 表单校验
      rules: {
        title: { required: true, message: '请输入标题', trigger: 'change' },
        summary: { required: true, message: '请输入描述', trigger: 'change' },
        people: { required: true, message: '请输入处理人', trigger: 'change' },
        priority: { required: true, message: '请选择优先级', trigger: 'change' },
        endDate: { required: true, message: '请选择截止日期', trigger: 'change' }
      },
      // 优先级下拉框
      priorityOptions: [
        { label: '高', value: '2' },
        { label: '中', value: '1' },
        { label: '低', value: '0' }
      ]
    }
  },
  watch: {
    // 检测是否打开了查看类型的对话框
    isShowNodeDialog (newVal) {
      if (newVal && (this.type === 'look' || this.type === 'edit')) {
        this.nodeForm.people = this.nodeData.people
      }
      // 每次关闭对话框 重置表单数据
      if (!newVal) {
        setTimeout(() => {
          // 重置表单数据
          this.resetForm()
          // 重置表单校验和内容
          this.$refs['nodeForm'].resetFields()
        }, 100)
      }
    }
  },
  methods: {
    cancel () {
      this.$emit('hide-node-dialog', false)
    },
    addNode () {
      // this.nodeForm.endDate = this.nodeForm.endDate.getTime()
      console.log(this.nodeForm)
      // formData.endDate = this.nodeForm.endDate.getTime()
      // this.$emit('confirm-edit-node', this.nodeForm)
    },
    resetForm () {
      this.nodeForm = {
        title: '',
        summary: '',
        people: '',
        startNode: '',
        endNode: '',
        priority: '',
        endDate: '',
        file: ''
      }
    }
  }
}
</script>

<style scoped lang='scss'>
</style>

<template>
  <div class="container">
    <a-button>{{msg}}</a-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Other',
  components: {
  },
  computed: {
    ...mapGetters(['size', 'token'])
  },
  data () {
    return {
      msg: 'antd'
    }
  },
  mounted () {
  },
  methods: {
    getData () {
      // let p = new Promise(function (resolve, reject) {
      //   resolve('asd')
      // }).then(res => {
      //   console.log(res)
      // })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

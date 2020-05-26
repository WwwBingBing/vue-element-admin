<template>
  <div class="hello">
    <h1 id="id">{{ msg }}</h1>
    <h2>Essential Links</h2>
    <el-input v-model="msg"></el-input>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import $ from 'jquery'
export default {
  name: 'HelloWorld',
  computed: {
    ...mapGetters(['size', 'token'])
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    this.getData()
    // this.generateRoutes('/home')
  },
  methods: {
    getData () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

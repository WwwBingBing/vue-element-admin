<template>
  <div class="hello">
    <el-button @click="draw">draw</el-button>
    <div id="box">{{msg}}</div>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js'
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
  },
  methods: {
    draw () {
      // The application will create a renderer using WebGL, if possible,
      // with a fallback to a canvas render. It will also setup the ticker
      // and the root stage PIXI.Container
      const app = new PIXI.Application()
      console.log(app)
      // The application will create a canvas element for you that you
      // can then insert into the DOM
      document.querySelector('#box').appendChild(app.view)

      // load the texture we need
      // app.loader.add('bunny', '../assets/401_images/401.gif').load((loader, resources) => {
      app.loader.add('bunny', 'bunny.png').load((loader, resources) => {
        // This creates a texture from a 'bunny.png' image
        const bunny = new PIXI.Sprite(resources.bunny.texture)
        // Setup the position of the bunny
        bunny.x = app.renderer.width / 2
        bunny.y = app.renderer.height / 2

        // Rotate around the center
        bunny.anchor.x = 0.5
        bunny.anchor.y = 0.5
        console.log(bunny)

        // Add the bunny to the scene we are building
        app.stage.addChild(bunny)

        // Listen for frame updates
        app.ticker.add(() => {
          // each frame we spin the bunny around a bit
          bunny.rotation += 0.01
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  background: #c7551f;
}
</style>

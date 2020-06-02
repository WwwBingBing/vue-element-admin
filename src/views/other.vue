<template>
  <div class="hello">
    <glitchy-btn @click-btn="draw">
      <div>
        draw
      </div>
    </glitchy-btn>
    <div id="box">
        {{msg|uppercaseFirst}}
    </div>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js'
import { mapGetters } from 'vuex'
import img from '../assets/401_images/401.gif'
import GlitchyBtn from '@/components/GlitchyBtn'
// import $ from 'jquery'
export default {
  name: 'HelloWorld',
  components: {
    GlitchyBtn
  },
  computed: {
    ...mapGetters(['size', 'token'])
  },
  data () {
    return {
      msg: 'abcd'
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
      // The application will create a canvas element for you that you
      // can then insert into the DOM
      document.querySelector('#box').appendChild(app.view)

      // load the texture we need
      app.loader.add('bunny', img).load((loader, resources) => {
        // This creates a texture from a 'bunny.png' image
        console.log(resources)
        const bunny = new PIXI.Sprite(resources.bunny.texture)
        // Setup the position of the bunny
        bunny.x = app.renderer.width / 2
        bunny.y = app.renderer.height / 2

        // Rotate around the center
        bunny.anchor.x = 0.5
        bunny.anchor.y = 0.5

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
<style scoped lang="scss">
.hello {
  background: black;
  color: aquamarine;
  padding-top: 20px;
  text-align: center;
}
</style>

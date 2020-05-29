<template>
  <div class="content"
       @click="onclick">
    <div class="btn">
      <div class="btn__before">
        <div class="video-button__text">
          <slot></slot>
        </div>
        <div class="video-button__ic"><span></span></div>
      </div>
      <div class="btn__text">
        <div class="video-button__text">
          <slot></slot>
        </div>
        <div class="video-button__ic"><span></span></div>
      </div>
      <div class="btn__after">
        <div class="video-button__text">
          <slot></slot>
        </div>
        <div class="video-button__ic"><span></span></div>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
export default {
  name: 'GlitchyBtn',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    onclick () {
      this.$emit('click-btn')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content {
  display: inline-block;
}
.btn {
  z-index: 999;
  color: #fff;
  box-sizing: content-box;
  margin: 0 auto;
  padding-left: 10px;
  background: transparent;
  border: 1px solid hsla(209, 74%, 62%, 0.4);
  position: relative;
  font-size: 26px;
  display: flex;
  font-weight: 600;
  justify-content: flex-end;
  align-items: center;
  > div {
    display: flex;
  }
}
.btn:after,
.btn:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  visibility: hidden;
}
.btn:before {
  border: 1px solid #0ff;
  z-index: -1;
}

.btn:after {
  border: 1px solid #f0f;
  z-index: -2;
}
.btn__after,
.btn__before {
  visibility: visible;
  position: absolute;
}

.gbtn__before {
  color: #0ff;
  z-index: -1;
}

.btn__after {
  color: #f0f;
  z-index: -2;
}
.video-button__text {
  display: flex;
  direction: columns;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 8px;
  border-right: 1px solid hsla(0, 0%, 100%, 0.4);
  line-height: 58px;
  vertical-align: top;
  padding-right: 10px;
}
.video-button__ic {
  padding: 0 25px;
  height: 100%;
  align-items: center;
}
.video-button__ic span:after {
  position: absolute;
  content: "";
  top: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 0 5px 8.6px;
  border-color: transparent transparent transparent #fff;
}
.btn:hover .btn__before,
.btn:hover:before {
  visibility: visible;
  animation: glitchy 0.3s ease 0.3s infinite;
}

.btn:hover .btn__after,
.btn:hover:after {
  visibility: visible;
  animation: glitchy 0.3s ease infinite reverse;
}
@keyframes glitchy {
  0% {
    -webkit-transform: translate(-2px, 2px);
    transform: translate(-2px, 2px);
  }

  25% {
    -webkit-transform: translate(-2px, -2px);
    transform: translate(-2px, -2px);
  }

  50% {
    -webkit-transform: translate(2px, 2px);
    transform: translate(2px, 2px);
  }

  75% {
    -webkit-transform: translate(2px, -2px);
    transform: translate(2px, -2px);
  }

  to {
    -webkit-transform: translate(-2px, 2px);
    transform: translate(-2px, 2px);
  }
}
</style>

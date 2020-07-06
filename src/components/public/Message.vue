<style scoped>
p {
  padding: 0;
  margin: 0;
}
.top {
  top: 20px;
}
.center {
  top: 50% !important;
}
.bottom {
  bottom: 20px;
}
.message {
  max-width: 380px;
  box-sizing: border-box;
  border-radius: 4px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  color: #ffffff;
  padding: 15px;
  overflow: hidden;
  display: flex;
  align-items: center;
  background-color: chartreuse !important;
  transition: all 0.4s ease-in-out;
}
.message--success {
  background-color: chartreuse !important;
}
.message--error {
  background-color: brown !important;
}
.message-fade-enter,
.message-fade-leave-active {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>
<template>
  <transition name="message-fade">
    <div class="message" :class="[classType,position]" role="alert" v-show="visible">
      <p class="message__content">{{ message }}</p>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
@Component
export default class Message extends Vue {
  message = '';
  position = 'top';
  visible = false;
  duration = 2000;
  classType = '';
  closer = false;
  timer = null || 0;
  @Watch('closer')
  onChangeValue (val: boolean) {
    if (val) {
      this.visible = false
      this.$el.addEventListener('transitionend', this.destroyElement)
    }
  }

  mounted () {
    this.startTimer()
  }

  // method
  destroyElement () {
    this.$el.removeEventListener('transitionend', this.destroyElement)
    this.$destroy()
    this.$el.parentNode.removeChild(this.$el)
  }

  startTimer () {
    if (this.duration > 0) {
      this.timer = setTimeout(() => {
        if (!this.closer) {
          this.close()
        }
      }, this.duration)
    }
  }

  close () {
    this.closer = true
  }
}
</script>

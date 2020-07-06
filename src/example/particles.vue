<template>
  <div class="mian">
    <div class="img-wrap">
      <img 
      src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2607469217,3658463155&fm=26&gp=0.jpg" 
      class="particles-img"
      @click="handClick('.particles-img', 0)"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component,Vue } from 'vue-property-decorator'
import {Particles} from '@/utils/particle'
@Component
export default class Particle extends Vue {
  // animejs targets
  arrOpts = [
    {
      color: '#e85577', // 粒子颜色
      particlesAmountCoefficient: 20, // 粒子密度
      duration: 2000, // 过渡时间
      size: 4, // 粒子大小
      easing: 'easeOutQuart', // 过渡方式
      direction: 'top', // 过渡方向
      type: 'triangle', // 粒子形状
    }
  ]
  handClick (className: string, optInde: number) {
    const elNode = document.querySelector(className)
    const particlesOpts = this.arrOpts[optInde]
    const particles = new Particles(elNode, particlesOpts)
    let isVisible = true
    if(!particles.isAnimating() && isVisible) {
      particles.disintegrate()
      isVisible = !isVisible
    }
  }
}
</script>
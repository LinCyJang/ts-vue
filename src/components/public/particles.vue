
<style scoped>
h1{
  margin: 0;
  cursor: pointer;
}
img{
  width: 100%;
}
.img-wrap{
  height: 50%;
  width: 50%;
  margin: 40px;
}
</style>
<template>
  <div class="main">
    <div class="grid">
      <div class="grid__item">
        <button class="particles-button" @click="handClick(`.particles-button`, 1)">我是一个按钮</button>
      </div>
      <div class="grid__item">
        <h1 class="particles-h1" @click="handClick('.particles-h1', 2)">我是一段文字</h1>
      </div>
      <div class="grid__item">
        <div class="img-wrap">
          <img class="particles-img" @click="handClick('.particles-img', 0)" src="http://img0.imgtn.bdimg.com/it/u=2749582461,4156327441&fm=26&gp=0.jpg"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Particles } from "@/utils/particle.ts";
@Component
export default class Particle extends Vue {
  // animejs targets
  arrOpts = [
    {
      color: '#e85577',
      duration: 1500,
      particlesAmountCoefficient: 14,
    },
    {
      type: "triangle",
      easing: "easeOutQuart",
      size: 4,
      color: '#ccc',
      particlesAmountCoefficient: 4,
      oscillationCoefficient: 2
    },
    {
      type: "rectangle",
      duration: 1500,
      easing: "easeOutQuad",
      color: "#091388",
      direction: "top",
      size: 8
    }
  ];

  handClick(className: string, optIndex: number) {
    const bttn = document.querySelector(className);
    const particlesOpts = this.arrOpts[optIndex];
    const particles = new Particles(bttn, particlesOpts);
    let buttonVisible = true;
    if (!particles.isAnimating() && buttonVisible) {
      particles.disintegrate();
      buttonVisible = !buttonVisible;
    }
  }
}
</script>

<template>
  <div class="d-effct">
    <ul class="box-list">
      <li v-for="(item,index) in 46" :key="index">
        <div class="info"></div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Effct extends Vue{
  nodes = []
  
  mounted () {
    (this as any ).nodes = document.querySelectorAll('li')
    this.nodes.forEach((el: Element) => {
      el.addEventListener(
        'mouseover',
        (ev) => {
           this.addClass(ev, el, 'in')
        },
        false
      )

       el.addEventListener(
        'mouseout',
        (ev) => {
           this.addClass(ev, el, 'out')
        }
      )
    })
  }

  getDirection (ev: any, obj: any) {
    const w = obj.offsetWidth
      const h = obj.offsetHeight
      const x = ev.pageX - obj.offsetLeft - (w / 2) * (w > h ? h / w : 1)
      const y = ev.pageY - obj.offsetTop - (h / 2) * (h > w ? w / h : 1)
      const d =
        Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90 + 3) % 4
      return d
  }
  addClass (ev: any, obj: any, state: string) {
    const direction = this.getDirection(ev, obj)
      let classsuffix = ''
      obj.className = ''
      // 通过计算鼠标移入方向更换li的类名
      switch (direction) {
        case 0:
          classsuffix = '-top'
          break
        case 1:
          classsuffix = '-right'
          break
        case 2:
          classsuffix = '-bottom'
          break
        case 3:
          classsuffix = '-left'
          break
      }

      obj.classList.add(state + classsuffix)
  }
}
</script>
<style scoped>
.box-list {
  padding: 0;
  margin: 0 0 50px;
}
.d-effct {
  width: 840px;
  margin: 0 auto;
}
ul:after {
  content: "";
  display: table;
  clear: both;
}
.box-list li {
  -webkit-perspective: 400px;
  perspective: 400px;
  height: 200px;
  width: 200px;
  background-color: #ecf0f1;
  margin: 5px;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  float: left;
}
.info {
  background: rgba(52, 73, 94, 0.6);
  -webkit-transform: rotate3d(1, 0, 0, 90deg);
  transform: rotate3d(1, 0, 0, 90deg);
  width: 100%;
  height: 100%;
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 4px;
  pointer-events: none;
  opacity: 0.3;
}
.in-top .info {
  -webkit-transform-origin: 50% 0%;
  transform-origin: 50% 0%;
  -webkit-animation: in-top 300ms ease 0ms 1 forwards;
  animation: in-top 300ms ease 0ms 1 forwards;
}

.in-right .info {
  -webkit-transform-origin: 100% 0%;
  transform-origin: 100% 0%;
  -webkit-animation: in-right 300ms ease 0ms 1 forwards;
  animation: in-right 300ms ease 0ms 1 forwards;
}

.in-bottom .info {
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
  -webkit-animation: in-bottom 300ms ease 0ms 1 forwards;
  animation: in-bottom 300ms ease 0ms 1 forwards;
}

.in-left .info {
  -webkit-transform-origin: 0% 0%;
  transform-origin: 0% 0%;
  -webkit-animation: in-left 300ms ease 0ms 1 forwards;
  animation: in-left 300ms ease 0ms 1 forwards;
}

.out-top .info {
  -webkit-transform-origin: 50% 0%;
  transform-origin: 50% 0%;
  -webkit-animation: out-top 300ms ease 0ms 1 forwards;
  animation: out-top 300ms ease 0ms 1 forwards;
}

.out-right .info {
  -webkit-transform-origin: 100% 50%;
  transform-origin: 100% 50%;
  -webkit-animation: out-right 300ms ease 0ms 1 forwards;
  animation: out-right 300ms ease 0ms 1 forwards;
}

.out-bottom .info {
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
  -webkit-animation: out-bottom 300ms ease 0ms 1 forwards;
  animation: out-bottom 300ms ease 0ms 1 forwards;
}

.out-left .info {
  -webkit-transform-origin: 0% 0%;
  transform-origin: 0% 0%;
  -webkit-animation: out-left 300ms ease 0ms 1 forwards;
  animation: out-left 300ms ease 0ms 1 forwards;
}

@-webkit-keyframes in-top {
  from {
    -webkit-transform: rotate3d(-1, 0, 0, 90deg);
    transform: rotate3d(-1, 0, 0, 90deg);
  }
  to {
    -webkit-transform: rotate3d(0, 0, 0, 0deg);
    transform: rotate3d(0, 0, 0, 0deg);
  }
}

@keyframes in-top {
  from {
    -webkit-transform: rotate3d(-1, 0, 0, 90deg);
    transform: rotate3d(-1, 0, 0, 90deg);
  }
  to {
    -webkit-transform: rotate3d(0, 0, 0, 0deg);
    transform: rotate3d(0, 0, 0, 0deg);
  }
}
@-webkit-keyframes in-right {
  from {
    -webkit-transform: rotate3d(0, -1, 0, 90deg);
    transform: rotate3d(0, -1, 0, 90deg);
  }
  to {
    -webkit-transform: rotate3d(0, 0, 0, 0deg);
    transform: rotate3d(0, 0, 0, 0deg);
  }
}
@keyframes in-right {
  from {
    -webkit-transform: rotate3d(0, -1, 0, 90deg);
    transform: rotate3d(0, -1, 0, 90deg);
  }
  to {
    -webkit-transform: rotate3d(0, 0, 0, 0deg);
    transform: rotate3d(0, 0, 0, 0deg);
  }
}
@-webkit-keyframes in-bottom {
  from {
    -webkit-transform: rotate3d(1, 0, 0, 90deg);
    transform: rotate3d(1, 0, 0, 90deg);
  }
  to {
    -webkit-transform: rotate3d(0, 0, 0, 0deg);
    transform: rotate3d(0, 0, 0, 0deg);
  }
}
@keyframes in-bottom {
  from {
    -webkit-transform: rotate3d(1, 0, 0, 90deg);
    transform: rotate3d(1, 0, 0, 90deg);
  }
  to {
    -webkit-transform: rotate3d(0, 0, 0, 0deg);
    transform: rotate3d(0, 0, 0, 0deg);
  }
}
@-webkit-keyframes in-left {
  from {
    -webkit-transform: rotate3d(0, 1, 0, 90deg);
    transform: rotate3d(0, 1, 0, 90deg);
  }
  to {
    -webkit-transform: rotate3d(0, 0, 0, 0deg);
    transform: rotate3d(0, 0, 0, 0deg);
  }
}
@keyframes in-left {
  from {
    -webkit-transform: rotate3d(0, 1, 0, 90deg);
    transform: rotate3d(0, 1, 0, 90deg);
  }
  to {
    -webkit-transform: rotate3d(0, 0, 0, 0deg);
    transform: rotate3d(0, 0, 0, 0deg);
  }
}
@-webkit-keyframes out-top {
  from {
    -webkit-transform: rotate3d(0, 0, 0, 0deg);
    transform: rotate3d(0, 0, 0, 0deg);
  }
  to {
    -webkit-transform: rotate3d(-1, 0, 0, 104deg);
    transform: rotate3d(-1, 0, 0, 104deg);
  }
}
@keyframes out-top {
  from {
    -webkit-transform: rotate3d(0, 0, 0, 0deg);
    transform: rotate3d(0, 0, 0, 0deg);
  }
  to {
    -webkit-transform: rotate3d(-1, 0, 0, 104deg);
    transform: rotate3d(-1, 0, 0, 104deg);
  }
}
@-webkit-keyframes out-right {
  from {
    -webkit-transform: rotate3d(0, 0, 0, 0deg);
    transform: rotate3d(0, 0, 0, 0deg);
  }
  to {
    -webkit-transform: rotate3d(0, -1, 0, 104deg);
    transform: rotate3d(0, -1, 0, 104deg);
  }
}
@keyframes out-right {
  from {
    -webkit-transform: rotate3d(0, 0, 0, 0deg);
    transform: rotate3d(0, 0, 0, 0deg);
  }
  to {
    -webkit-transform: rotate3d(0, -1, 0, 104deg);
    transform: rotate3d(0, -1, 0, 104deg);
  }
}
@-webkit-keyframes out-bottom {
  from {
    -webkit-transform: rotate3d(0, 0, 0, 0deg);
    transform: rotate3d(0, 0, 0, 0deg);
  }
  to {
    -webkit-transform: rotate3d(1, 0, 0, 104deg);
    transform: rotate3d(1, 0, 0, 104deg);
  }
}
@keyframes out-bottom {
  from {
    -webkit-transform: rotate3d(0, 0, 0, 0deg);
    transform: rotate3d(0, 0, 0, 0deg);
  }
  to {
    -webkit-transform: rotate3d(1, 0, 0, 104deg);
    transform: rotate3d(1, 0, 0, 104deg);
  }
}
@-webkit-keyframes out-left {
  from {
    -webkit-transform: rotate3d(0, 0, 0, 0deg);
    transform: rotate3d(0, 0, 0, 0deg);
  }
  to {
    -webkit-transform: rotate3d(0, 1, 0, 104deg);
    transform: rotate3d(0, 1, 0, 104deg);
  }
}
@keyframes out-left {
  from {
    -webkit-transform: rotate3d(0, 0, 0, 0deg);
    transform: rotate3d(0, 0, 0, 0deg);
  }
  to {
    -webkit-transform: rotate3d(0, 1, 0, 104deg);
    transform: rotate3d(0, 1, 0, 104deg);
  }
}
</style>

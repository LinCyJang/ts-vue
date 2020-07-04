<style scoped>
  .home .center button{
    padding: 0 12px;
    margin: 12px;
  }
</style>

<template>
  <div class="home">
    <div class="center">
      <button @click="$message.error('这是一条错误的信息', 'top')">上</button>
      <button @click="$message.error('这是一条错误的信息', 'center')">中</button>
      <button @click="$message.success('这是一条成功的信息', 'bottom')">下</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Home extends Vue {

}
</script>
